/* @name createUser */
INSERT INTO
    "users" (
        "id",
        "name",
        "email",
        "hash",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (
        :id,
        :name,
        :email,
        :hash,
        :createdAt,
        :updatedAt,
        :deletedAt
    );

/* @name findByEmail */
select
    *
from
    "users"
where
    "users"."email" = :email;

/* @name findById */
select
    *
from
    "users"
where
    "users"."id" = :id;

/* @name __deleteAllUsers */
delete from
    users;

/* @name findUserPermissionsByUserId */
select
    p."name"
from
    permissions p
    inner join user_permissions up on up."permissionId" = p.id
    inner join users u on u.id = up."userId"
where
    u.id = :userId
    and up.status = true;

/* @name findStoresByUserId */
select
    "storeId"
from
    user_store us
where
    us."userId" = :userId;

/* @name softDeleteUser */
UPDATE
    "users"
SET
    "deletedAt" = :deletedAt,
    "updatedAt" = :deletedAt
where
    "id" = :id;

/* @name updateUser */
UPDATE
    "users"
SET
    "name" = :name,
    "email" = :email,
    "hash" = :hash,
    "updatedAt" = :updatedAt
where
    "id" = :id;