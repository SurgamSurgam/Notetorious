# DB Schema

## Users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | primary key
username        | string    | not null, unique
email           | string    | not null, unique
password        | string    | not null
profile_pic     | string    | optional

*user has a profile, many notebooks, many notes through notebooks*

## Notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | primary key
title       | string    | not null, unique
body        | text      | not null
created_at  | datetime  | not null
updated_at  | datetime  | not null
user_id     | integer   | not null, foreign key (references users), on delete cascade
notebook_id | integer   | not null, foreign key (references notebooks), on delete cascade
favorited   | boolean   | not null, default: false

*notes belong to a user and a notebook*

## Notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | primary key
author_id   | integer   | not null, foreign key (references users), on delete cascade
title       | string    | not null
created_at  | datetime  | not null
updated_at  | datetime  | not null
is_default  | boolean   | not null, default: false

*notebooks have belong to a user*

## Tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | primary key
name        | string    | not null

*tags have many notes*

## Taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | primary key
note_id     | integer   | not null, foreign key (references notes), unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags)

*taggings belong to notes and tags*
