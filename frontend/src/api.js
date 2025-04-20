import axios from "axios";
const BASE_URL='https://event-planner-henon-f1a7c972e0e6.herokuapp.com/'
const API = axios.create({
  baseURL: BASE_URL + "/api"
});

export const getEvents = () => API.get("/events/");
export const getEventTypes=()=>API.get("/event-types/")

export const createEvent = (data) => API.post("/events/", data);
export const updateEvent = (id, data) => API.put(`/events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}/`);
