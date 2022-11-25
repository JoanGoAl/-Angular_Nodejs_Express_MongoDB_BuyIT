#!/usr/bin/env bash
FILES="/db-dump/*.json"

for f in $FILES; do
    mongoimport --authenticationDatabase admin --username joan --password 1234 -d buyIT --jsonArray --file $f;
done