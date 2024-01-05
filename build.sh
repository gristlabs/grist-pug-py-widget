#!/usr/bin/env sh

python -m transcrypt --nomin --map --verbose --outdir js api.py
yarn pug index.pug
