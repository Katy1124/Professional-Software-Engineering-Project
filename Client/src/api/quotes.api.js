import { http } from "./http";

export const quotesApi = {
  list: () => http.get("/api/Quotes"),
  getByTicketId: (ticketId) => http.get(`/api/Quotes?ticket_Id=${ticketId}`),
  getById: (id) => http.get(`/api/Quotes/${id}`),
  create: (payload) => http.post("/api/Quotes", payload),
  update: (id, payload) => http.put(`/api/Quotes/${id}`, payload),
  remove: (id) => http.del(`/api/Quotes/${id}`),
};