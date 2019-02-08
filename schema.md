# DB Schema

## Users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password        | string    | not null
profile_pic     | string    | optional

*user has a profile, many notebooks, many notes through notebooks*

## Notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, unique
body        | text      | not null
created_at  | datetime  | not null
updated_at  | datetime  | not null
user_id     | integer   | not null, foreign key (references users), indexed
notebook_id | integer   | not null, foreign key (references notebooks), indexed
favorited   | boolean   | not null, default: false

*notes belong to a user and a notebook*

## Notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
created_at  | datetime  | not null
updated_at  | datetime  | not null
is_default  | boolean   | not null, default: false

*notebooks have belong to a user*

## Tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

*tags have many notes*

## Taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
note_id     | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

*taggings belong to notes and tags*
