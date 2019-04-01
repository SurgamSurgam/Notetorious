# API endpoints

## HTML API
### Root
  - `GET /`

## JSON API

### Users
  - `POST /api/users` ( create user)
  - `PATCH /api/users/:id` ( update user)
  - `DELETE /api/users/:id` ( delete user )

### Notes
  - `GET /api/notes` ( get all notes )
    * Should handle both all notes by notebook and all notes by tag!
  - `GET /api/notes/:id` ( get single note )
  - `POST /api/notes/` ( create a note )
  - `PATCH /api/notes/:id` ( update a note )
  - `DELETE /api/notes/:id` ( delete a note )

### Notebooks
  - `GET /api/notebooks` (get all notebooks, lists notebook titles and note count)
  - `GET /api/notebooks/:id` ( get single notebook and fire `GET /api/notes` for said notebook )
  - `POST /api/notebooks/` ( create a notebook )
  - `PATCH /api/notebooks/:id` ( update a notebook )
  - `DELETE /api/notebooks/:id` ( delete a notebook )

### Tags
  - `GET /api/tags` ( get all tags, lists all tag titles and note count )
  - `GET /api/tags/:id` ( get single tag and fire `GET /api/notes` for said tag)
  - `POST /api/tags` ( create a tag )
  - `PATCH /api/tags/:id` ( update a tag)
  - `DELETE /api/tags/:id` ( delete a tag)

# Frontend
* `/` (landing)
* `/signup` (form)
* `/login` (form)
* `/client` (main)
