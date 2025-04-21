
# 📅 Event Planner App

A full-stack Event Planner application designed to help users seamlessly create, view, update, and delete events. This app is perfect for scheduling meetings, parties, or any type of gathering. Users can view categorized events, and the UI provides a clean and intuitive experience for managing event data.

🌐 **Live Website:**  
**[https://event-planner-henon-f1a7c972e0e6.herokuapp.com/](https://event-planner-henon-f1a7c972e0e6.herokuapp.com/)**

This application is built using a modern **React** frontend and a robust **Django REST Framework** backend. It leverages **MySQL** for data persistence and supports cross-origin requests with proper CSRF and CORS configuration, enabling secure communication between the frontend and backend.

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios
- **Backend:** Django, Django REST Framework
- **Database:** MySQL
- **Deployment:** Heroku (backend), Vercel/Netlify/Localhost (frontend)

---

## ⚙️ Project Structure

```
event-planner/
│
├── frontend/            # React app (client)
│   └── src/
│       └── api/         # Axios configuration
│       └── components/  # UI components
│       └── pages/       # Page components
│
├# Django app
│── config/          # Django settings & URLs
│── events/          # Main events app (models, views, etc.)
│── manage.py
```

---

## 🚀 Getting Started

### 🔧 Backend Setup (Django)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nekkunj/Event_Planner_React_Django
   cd Event_Planner_React_Django/
   ```

2. **Create a virtual environment & install dependencies:**
   ```bash
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables** (change it in config/setting.py):
   ```
   DATABASE_URL=mysql://username:password@host:port/dbname
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```
   I have hosted it on hereku postgres

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py showmigrations
   ```

5. **Run the backend server:**
   ```bash
   python manage.py runserver
   ```


---

### 🌐 Frontend Setup (React) Locally

1. **Navigate to frontend and install dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm start
   ```

3. Your frontend will run on [http://localhost:3000](http://localhost:3000) and communicate with the Heroku backend.

---

## 🔄 API Endpoints

Base URL: `https://event-planner-henon-f1a7c972e0e6.herokuapp.com/api/`

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | /events/           | List all events         |
| POST   | /events/           | Create a new event      |
| PUT    | /events/:id/       | Update an event         |
| DELETE | /events/:id/       | Delete an event         |
| GET    | /event-types/      | List available types    |

---

## 🔐 Axios Configuration (Frontend)

```js
import axios from "axios";

const BASE_URL = 'https://event-planner-henon-f1a7c972e0e6.herokuapp.com';

const API = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true,
});

API.defaults.xsrfHeaderName = 'X-CSRFToken';
API.defaults.xsrfCookieName = 'csrftoken';

export const getEvents = () => API.get("/events/");
export const getEventTypes = () => API.get("/event-types/");
export const createEvent = (data) => API.post("/events/", data);
export const updateEvent = (id, data) => API.put(`/events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}/`);
```

---

## ✅ To Do / Improvements

- [ ] Add authentication (JWT or session-based)
- [ ] Add filtering & search
- [ ] Implement notifications / calendar integration

---
