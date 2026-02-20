import { http } from "./http";

export const logsApi = {
  list: () => http.get("/api/Logs"),
  getById: (id) => http.get(`/api/Logs/${id}`),
  create: (payload) => http.post("/api/Logs", payload),
  update: (id, payload) => http.put(`/api/Logs/${id}`, payload),
  remove: (id) => http.del(`/api/Logs/${id}`),
};