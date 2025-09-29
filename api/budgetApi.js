import axios from "axios";

export async function getBudget() {
  const res = await axios.get("/budget");
  return res.data;
}
