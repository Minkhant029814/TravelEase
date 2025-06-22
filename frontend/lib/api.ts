// lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  //  OAuth
  oauthRedirect: (provider: string) => api.get(`/auth/${provider}/redirect`),
  oauthCallback: (provider: string, query: any) =>
    api.get(`/auth/${provider}/callback`, { params: query }),

  //  Destinations
  getDestinations: () => api.get("/destinations"),
  getDestination: (id: number) => api.get(`/destinations/${id}`),
  createDestination: (data: FormData) =>
    api
      .post("/destinations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  updateDestination: (id: number, data: FormData) =>
    api.put(`/destinations/${id}`, data),
  deleteDestination: (id: number) => api.delete(`/destinations/${id}`),

  //  Activities
  getActivities: () => api.get("/activities"),
  getActivity: (id: number) => api.get(`/activities/${id}`),
  createActivity: (data: any) => api.post("/activities", data),
  updateActivity: (id: number, data: any) => api.put(`/activities/${id}`, data),
  deleteActivity: (id: number) => api.delete(`/activities/${id}`),

  //  Travel Tips
  getTravelTips: () => api.get("/travel_tips"),
  createTravelTip: (data: FormData) => api.post("/travel_tips", data),
  updateTravelTip: (id: number, data: FormData) =>
    api.post(`/travel_tips/${id}`, data),
  deleteTravelTip: (id: number) => api.delete(`/travel_tips/${id}`),
  getTravelTip: (id: number) => api.get(`/travel_tips/${id}`),

  //  Users
  getUsers: () => api.get("/users"),
  getUser: (id: number) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post("/users", data),
  updateUser: (id: number, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/users/${id}`),
  assignRole: (userId: number, roleId: number) =>
    api.post(`/users/${userId}/roles/${roleId}`),

  //  Role
  getRoles: () => api.get("/roles"),
  getRole: (id: number) => api.get(`/roles/${id}`),
  createRole: (data: any) => api.post("/roles", data),
  updateRole: (id: number, data: any) => api.put(`/roles/${id}`, data),
  deleteRole: (id: number) => api.delete(`/roles/${id}`),

  //  Reservations
  getReservations: () => api.get("/reservations"),
  createReservation: (data: any) => api.post("/reservations", data),
  getReservation: (id: number) => api.get(`/reservations/${id}`),
  updateReservation: (id: number, data: any) =>
    api.put(`/reservations/${id}`, data),
  deleteReservation: (id: number) => api.delete(`/reservations/${id}`),

  //  Payments
  getPayments: () => api.get("/payments"),
  createPayment: (data: any) => api.post("/payments", data),
  getPayment: (id: number) => api.get(`/payments/${id}`),
  updatePayment: (id: number, data: any) => api.put(`/payments/${id}`, data),
  deletePayment: (id: number) => api.delete(`/payments/${id}`),

  //  Reviews
  getReviews: () => api.get("/reviews"),
  createReview: (data: any) => api.post("/reviews", data),
  getReview: (id: number) => api.get(`/reviews/${id}`),
  updateReview: (id: number, data: any) => api.put(`/reviews/${id}`, data),
  deleteReview: (id: number) => api.delete(`/reviews/${id}`),

  //  Notifications
  getNotifications: () => api.get("/notifications"),
  getNotification: (id: number) => api.get(`/notifications/${id}`),
  createNotification: (data: any) => api.post("/notifications", data),
  updateNotification: (id: number, data: any) =>
    api.put(`/notifications/${id}`, data),
  deleteNotification: (id: number) => api.delete(`/notifications/${id}`),

  //  Customer Services
  getCustomerServices: () => api.get("/customer_service"),
  getCustomerService: (id: number) => api.get(`/customer_service/${id}`),
  createCustomerService: (data: any) => api.post("/customer_service", data),
  updateCustomerService: (id: number, data: any) =>
    api.put(`/customer_service/${id}`, data),
  deleteCustomerService: (id: number) => api.delete(`/customer_service/${id}`),
};
