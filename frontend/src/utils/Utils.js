import axios from "axios";

//we need to get the user id from database perhaps upon logging in
// set up a catch error!
export const getAllNotebooks = () => axios.get("/api/notebooks/");
export const getSingleNotebook = () => axios.get("/api/notebooks/:notebook_id");
export const addNotebook = () => axios.post("/api/notebooks/");
export const editNotebook = () => axios.patch("/api/notebooks/:notebook_id");
export const deleteNotebook = () => axios.delete("/api/notebooks/:notebook_id");
