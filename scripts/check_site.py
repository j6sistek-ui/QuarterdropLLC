#!/usr/bin/env python3
"""Dependency-free checks for missing assets, broken anchors and company details."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.ids, self.refs, self.h1s = path, set(), [], 0
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                ERRORS.append(f'{self.path.name}: duplicate id {attrs["id"]}')
            self.ids.add(attrs['id'])
        if tag == 'h1':
            self.h1s += 1
        if tag == 'img' and 'alt' not in attrs:
            ERRORS.append(f'{self.path.name}: image without alternative text')
        for name in ('src', 'href', 'data-src', 'data-poster'):
            if attrs.get(name):
                self.refs.append(attrs[name])

pages = {p.resolve(): Page(p) for p in ROOT.glob('*.html')}
for path, page in pages.items():
    if page.h1s != 1:
        ERRORS.append(f'{path.name}: expected one page heading')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        target = (ROOT / url.path.lstrip('/') if url.path.startswith('/') else path.parent / url.path).resolve() if url.path else path
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            ERRORS.append(f'{path.name}: missing {ref}')
        if url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            ERRORS.append(f'{path.name}: missing anchor {ref}')
for css in (ROOT / 'assets').glob('*.css'):
    for ref in re.findall(r'url\([\'"]?([^\)\'"\s]+)', css.read_text()):
        if not urlsplit(ref).scheme and not (css.parent / urlsplit(ref).path).resolve().is_file():
            ERRORS.append(f'{css.name}: missing {ref}')
home = (ROOT / 'index.html').read_text()
for required in ('Quarterdrop LLC', 'Novi, Michigan, United States', '149991287', 'mailto:acornaut@outlook.com'):
    if required not in home:
        ERRORS.append(f'Home page lost required company detail: {required}')
for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>', home, re.S):
    json.loads(data)
if (ROOT / 'CNAME').read_text().strip() != 'quarterdropgames.com':
    ERRORS.append('Custom domain changed')
if ERRORS:
    raise SystemExit('\n'.join(ERRORS))
print(f'PASS: {len(pages)} pages; local assets and anchors; image alternatives; company details; structured data; custom domain.')
