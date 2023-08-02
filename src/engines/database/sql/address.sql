/* @name createAddress */
INSERT INTO
    "address" (
        "id",
        "street",
        "neighborhood",
        "country",
        "number",
        "complement",
        "updatedAt"
    )
VALUES
    (
        :id,
        :street,
        :neighborhood,
        :country,
        :number,
        :complement,
        :updatedAt
    );

/* @name findAddressById */
select
    *
from
    "address"
where
    "address"."id" = :id;

/* @name findAddressByStoreId */
select
    "address"."id",
    "address"."street",
    "address"."neighborhood",
    "address"."country",
    "address"."number",
    "address"."complement",
    "address"."updatedAt"
from
    "address"
    inner join "store_profile" on "store_profile"."addressId" = "address"."id"
    inner join "stores" on "stores"."id" = "store_profile"."storeId"
where
    "stores"."id" = :id;

/* @name updateAddress */
UPDATE
    "address"
SET
    "street" = :street,
    "neighborhood" = :neighborhood,
    "country" = :country,
    "number" = :number,
    "complement" = :complement,
    "updatedAt" = :updatedAt
where
    "id" = :id;