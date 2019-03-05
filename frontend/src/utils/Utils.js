import axios from "axios";

// set up a catch error!

//notebooks
export const getAllNotebooks = () => axios.get("/api/notebooks/");
export const getSingleNotebook = () => axios.get("/api/notebooks/:notebook_id");
export const addNotebook = () => axios.post("/api/notebooks/");
export const editNotebook = () => axios.patch("/api/notebooks/:notebook_id");
export const deleteNotebook = () => axios.delete("/api/notebooks/:notebook_id");

//notes
export const getAllNotes = () => axios.get("/api/notes/");
// export const getAllNotesFromSingleNotebook = () => axios.get("/api/notes/:notebook_id");

//tags
export const getAllTagsForCurrentUser = () => axios.get("/api/tags/");
export const getAllTagsFromEveryone = () => axios.get("/api/tags/all_tags");
