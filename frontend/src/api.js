import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const getEvents = () => API.get("/events/");
export const getEventTypes=()=>API.get("/event-types/")

export const createEvent = (data) => API.post("/events/", data);
export const updateEvent = (id, data) => API.put(`/events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}/`);
