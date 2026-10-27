#!/usr/bin/env bash
# Copies the app into test/site for the browser tests
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/test/site"
cp "$ROOT"/index.html "$ROOT"/*.js "$ROOT/test/site/"
