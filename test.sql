CREATE DATABASE test2;

CREATE TABLE db_users (
    id              SERIAL PRIMARY KEY,
    name            text,
    user_id         int,
    asset           money[],
    secret          bit(6),
    user_info       JSON,
    UNIQUE (user_id, id)
);

INSERT INTO db_users (name, user_id, asset, secret, user_info) VALUES
    ('朱晓毅', 2017001, '{16615}', B'000111', '{"body":[170,63.7], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('王浩', 20170019, '{19811}', B'000111', '{"body":[171,61.2], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('沈杰', 20170013, '{14981}', B'000111', '{"body":[172,64.5], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('徐国庆', 20170014, '{19198}', B'000111', '{"body":[173,58.9], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('隗云志', 20170015, '{19819}', B'000111', '{"body":[175,59.3], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('沈鹏飞', 20170016, '{19611}', B'000111', '{"body":[175,63.6], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
    ('祁曼莉', 20170017, '{19564}', B'000111', '{"body":[175,61.8], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' );

CREATE OR REPLACE FUNCTION totalRecords ()
RETURNS integer AS $total$
declare
    total integer;
BEGIN
   SELECT count(*) into total FROM db_users;
   RETURN total;
END;
$total$ LANGUAGE plpgsql;

select totalRecords();

CREATE OR REPLACE FUNCTION db_users_children(id int DEFAULT 0)
RETURNS SETOF db_users
AS
$$
SELECT * FROM db_users WHERE 2017001 > 10000;
$$
LANGUAGE SQL IMMUTABLE STRICT;