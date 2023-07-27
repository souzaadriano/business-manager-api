mkdir -p ./src/engines/database/models/temp

for file in ./src/engines/database/models/*.prisma; do
    sed '/\/\/@relations/,$d' "$file" > "./src/engines/database/models/temp/$(basename "$file")"
done

cat ./src/engines/database/models/connection.config ./src/engines/database/models/temp/*.prisma > ./src/engines/database/schema.prisma
rm -rf ./src/engines/database/models/temp
yarn format:schema