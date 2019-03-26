# NOTEtorious

[Trello][trello]

[trello]: https://trello.com/b/BAHg7c4m/notetorious-evernote-app

# MVP

My project is a full-stack web application inspired by Evernote and built using the PERN stack (Postgres, Express, React/Redux and NodeJS). Like Evernote, NOTEtorious helps users stay organized by allowing them to create, modify, tag, and store notes in notebooks. By the end of the production period, this app will, at a minimum, satisfy the following criteria:

- New account creation, login, and guest/demo login
- A production README
- Hosting on Heroku
- Notes (CRUD)
- Notebooks (CRUD)
- Rich-text editing(Quill.js/Draft.js)
- Tags (Categorize)

# Design Docs

- [View Wireframes](./wireframes)
- [API Endpoints](./api-endpoints.md)
- [DB Schema](./schema.md)
- [React Components](./component-hierarchy.md)
- [Sample State](./sample-state.md)

![Notetorious](./images)

# Implementation Timeline

## Phase 1: Backend setup (3 days)

- **Objective:** Functioning Express project with necessary routes and placeholder home page

## Phase 2: Notes (3 days)

- **Objective:** Implement CRUD via API. Research/choose Quill/Draft for rich text editing

## Phase 3: Notebooks (3 days)

- **Objective:** Implement CRUD via API. Filter notes by notebooks. Style notebook view, include dropdown for belonging notes

## Phase 4: Tags (3 day)

- **Objective:** Multiple tags can be added to one note. Notes can be untagged and tags can be deleted

## Extra: (TBD)

- Frontend/Backend Authentication
- Add search for notes, notebooks and tags
- Create Reminders for Notes
- Multiple sessions
- Add checklist/todo
- Allow sharing of notes/notebooks via social media
- Favorite notes shortcuts
- Autosave while editing
- Collaboration on notes
- Pagination / Infinite scroll
