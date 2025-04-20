import axios from "axios";
const BASE_URL='https://event-planner-henon-f1a7c972e0e6.herokuapp.com'
const API = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
// const csrftoken = getCookie('csrftoken');


export const getEvents = () => API.get("/events/");
export const getEventTypes=()=>API.get("/event-types/")

export const createEvent = (data) => API.post("/events/", data);
export const updateEvent = (id, data) => API.put(`/events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}/`);


API.defaults.xsrfHeaderName =  getCookie('csrftoken');
API.defaults.xsrfCookieName = "csrftoken";