# Event Management System

A simple event manager that provides to register or cancel events those exist on the system. Besides, there is a admin mode and in this mode user can add or delete events.

---

## Tech Stack

This repository showcases a decoupled, lightweight full-stack architecture optimized for speed, data persistence, and professional user experiences.

### Backend Development
* **Runtime Environment:** Node.js
* **Application Framework:** Express.js
* **Database Engine:** SQLite3 (Relational database management via local storage)
* **API Architecture:** RESTful APIs (Structured request/response pipelines)

---

1. **Authentication:** Users sign up or authenticate. Passing `admin123` elevates authorization scopes to Admin status dynamically.
2. **Session Persistence:** Login states, user roles, and access coordinates are safely managed via `localStorage` to guard against unintended hard refreshes.
3. **Data Synthesis:** The frontend engine dispatches secure HTTP requests (`GET`, `POST`, `DELETE`) to the backend API pipelines.
4. **Relational Operations:** The Express backend executes secure queries against the local SQLite database to commit registrations, clear events, or index live capacity metrics.

---

## 📸 Application Preview

Here is a visual glance at the premium corporate user interface running dynamically:

### 1. Administrative Control Panel
*Admins can seamlessly publish new events with strict validation fields.*

<img width="1470" height="612" alt="events2" src="https://github.com/user-attachments/assets/cccc7479-7874-47c7-bb05-e0a288033901" />

### 2. Available Events & Registrations
*Clean, grid-based presentation displaying real-time capacities and interactive actions.*

<img width="1462" height="872" alt="events1" src="https://github.com/user-attachments/assets/bda09553-c634-4a66-87c8-2ef9fb69433f" />
