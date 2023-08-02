/* @name createStore */
INSERT INTO
    "stores" (
        "id",
        "name",
        "owner",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (
        :id,
        :name,
        :owner,
        :createdAt,
        :updatedAt,
        :deletedAt
    );

/* @name addUserToStore */
INSERT INTO
    "user_store" ("storeId", "userId")
VALUES
    (:storeId, :userId);

/* @name createStoreProfile */
INSERT INTO
    "store_profile" ("storeId", "addressId", "logo")
VALUES
    (:storeId, :addressId, :logo);

/* @name findStoreById */
SELECT
    "stores"."id",
    "stores"."name",
    "stores"."owner" as "ownerId",
    "stores"."createdAt",
    "stores"."updatedAt",
    "stores"."deletedAt",
    "address"."street",
    "address"."neighborhood",
    "address"."country",
    "address"."number",
    "address"."complement",
    "address"."updatedAt" as "addressUpdatedAt",
    "address"."id" as "addressId",
    "store_profile"."logo",
    "users"."name" as "ownerName"
FROM
    "stores"
    INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
    INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
    INNER JOIN "users" on "users"."id" = "stores"."owner"
WHERE
    "stores"."id" = :id;

/* @name listActiveStores */
SELECT
    "stores"."id",
    "stores"."name",
    "stores"."owner" as "ownerId",
    "stores"."createdAt",
    "stores"."updatedAt",
    "stores"."deletedAt",
    "address"."street",
    "address"."neighborhood",
    "address"."country",
    "address"."number",
    "address"."complement",
    "address"."updatedAt" as "addressUpdatedAt",
    "address"."id" as "addressId",
    "store_profile"."logo",
    "users"."name" as "ownerName"
FROM
    "stores"
    INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
    INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
    INNER JOIN "users" on "users"."id" = "stores"."owner"
WHERE
    "stores"."deletedAt" is NULL;

/* @name listAllStores */
SELECT
    "stores"."id",
    "stores"."name",
    "stores"."owner" as "ownerId",
    "stores"."createdAt",
    "stores"."updatedAt",
    "stores"."deletedAt",
    "address"."street",
    "address"."neighborhood",
    "address"."country",
    "address"."number",
    "address"."complement",
    "address"."updatedAt" as "addressUpdatedAt",
    "address"."id" as "addressId",
    "store_profile"."logo",
    "users"."name" as "ownerName"
FROM
    "stores"
    INNER JOIN "store_profile" on "store_profile"."storeId" = "stores"."id"
    INNER JOIN "address" on "address"."id" = "store_profile"."addressId"
    INNER JOIN "users" on "users"."id" = "stores"."owner";

/* @name listStoreEmployeesByStoreId */
select
    "user_store"."userId",
    "users"."name"
from
    "user_store"
    inner join "users" on "users"."id" = "user_store"."userId"
where
    "user_store"."storeId" = :storeId;

/* @name softDeleteStore */
UPDATE
    "stores"
SET
    "deletedAt" = :deletedAt,
    "updatedAt" = :deletedAt
where
    "id" = :id;