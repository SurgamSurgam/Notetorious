import axios from "axios";

//we need to get the user id from database perhaps upon logging in
// set up a catch error!
export const getAllNotebooks = () => axios.get("/api/notebooks/user/1");
