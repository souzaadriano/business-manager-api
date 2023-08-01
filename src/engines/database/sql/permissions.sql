/* @name findAllPermission */
SELECT
    "id",
    "name"
FROM
    "permissions";

/* @name createPermission */
INSERT INTO
    "permissions" (
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "deletedAt"
    )
VALUES
    (
        :id,
        :name,
        :createdAt,
        :updatedAt,
        :deletedAt
    );

/* @name __deleteAllPermissions */
DELETE FROM
    "permissions";