const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const text = await res.text();
  const data = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })()
    : null;

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  if (!res.ok) {
    const message =
      (data && data.title) ||
      (data && data.detail) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status} ${res.statusText}`;

    throw new Error(message);
  }

  return data;
}

export const http = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (path, body) =>
    request(path, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  del: (path) => request(path, { method: "DELETE" }),
};