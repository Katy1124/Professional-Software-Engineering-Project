import { http } from "./http";

export const accountsApi = {
  list: () => http.get("/api/Accounts"),
  getById: (id) => http.get(`/api/Accounts/${id}`),
  create: (payload) => http.post("/api/Accounts", payload),
  update: (id, payload) => http.put(`/api/Accounts/${id}`, payload),
  remove: (id) => http.del(`/api/Accounts/${id}`),
};