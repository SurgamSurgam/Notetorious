- `App(root)`
  - **Landing**
  - **AuthFormContainer**
    - AuthForm
      - _signup_
      - _login_
  - **SidebarNav**
    - _SearchNotesContainer_
    - _CreateNote_
    - _NotesContainer_
    - _NotebooksContainer_
    - _TagsContainer_
- `SidebarNav(expanded)`

  - **SearchNotesContainer**
    - Search
      - _AllNotes_
      - _SingleNote_
  - **NotesContainer**
    - _AllNotes_
    - _SingleNote_
  - **NotebooksContainer**
    - AllNotebooks
      - _CreateNotebook_
      - _AllNotes_
    - SingleNotebook
      - _AllNotes_
      - _SingleNote_
  - **TagsContainer**
    - _AllTags_
      - _CreateTag_
    - _SingleTag_
      - _AllNotes_
      - _SingleNote_

# Routes

| Path  | Component |
| ------------- | ------------- |
| `/`  | App  |
| `/welcome`  | Landing  |
| `/signup`  | AuthFormContainer  |
| `/login`  | AuthFormContainer  |
| `/search`  | SearchNotesContainer  |
| `/notes`  | NotesContainer  |
| `/notes/:id`  | NotesContainer  |
| `/notes/:id/edit`  | NotesContainer  |
| `/notes/create`  | NotesContainer  |
| `/notebook`  | NotebooksContainer  |
| `/notebook/:id`  | NotebooksContainer  |
| `/tag`  | TagsContainer  |
| `/tag/:id`  | TagsContainer  |
