#!/usr/bin/env sh

python -m transcrypt --nomin --map --verbose --outdir js api.py
pug index.pug
