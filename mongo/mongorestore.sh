FILES="/db-dump/*.json"

for f in $FILES; do
    mongoimport -d buyIT --jsonArray --file $f;
done