import axios from "axios";
import "../root";

export const registerAdmin = async (data) =>
  await axios.post("/client/signUp", data);

export const loginAdmin = async (data) =>
  await axios.post("/client/login", data);

export const logoutAdmin = async () => await axios.post("/client/logout");
