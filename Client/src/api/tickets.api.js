import { http } from "./http";

export const ticketsApi = {
  list: () => http.get("/api/Tickets"),
  getById: (id) => http.get(`/api/Tickets/${id}`),
  create: (payload) => http.post("/api/Tickets", payload),
  update: (id, payload) => http.put(`/api/Tickets/${id}`, payload),
  remove: (id) => http.del(`/api/Tickets/${id}`),
};