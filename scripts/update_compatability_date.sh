#!/bin/bash
today=$(date +'%Y-%m-%d')
sed -i '' "s/^compatibility_date = .*/compatibility_date = \"$today\"/" ../wrangler.toml
echo "Updated compatibility_date to $today in wrangler.toml"
