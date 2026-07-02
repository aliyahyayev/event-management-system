# 📅 EventPass - Event Management System

A minimalist, high-performance Event Management System featuring a secure Express.js backend coupled with a modern, production-ready corporate dashboard built with Tailwind CSS.

---

## 🛠️ Tech Stack & Architecture

This repository showcases a decoupled, lightweight full-stack architecture optimized for speed, data persistence, and professional user experiences.

### Backend Development
* **Runtime Environment:** Node.js
* **Application Framework:** Express.js
* **Database Engine:** SQLite3 (Relational database management via local storage)
* **API Architecture:** RESTful APIs (Structured request/response pipelines)

### Frontend & UI
* **User Interface:** Vanilla JavaScript (Asynchronous state tracking & fetch operations)
* **Styling Framework:** Tailwind CSS (Premium corporate palette utilizing the modern Slate profile)
* **Component Architecture:** Virtual modals and sliding toast alerts (Zero raw browser alerts used to secure standard browser loops)

---

## 📐 System Workflow

The following model demonstrates how data flows dynamically between the client browser, system state, and database persistence layer without requiring page refreshes.



1. **Authentication:** Users sign up or authenticate. Passing `admin123` elevates authorization scopes to Admin status dynamically.
2. **Session Persistence:** Login states, user roles, and access coordinates are safely managed via `localStorage` to guard against unintended hard refreshes.
3. **Data Synthesis:** The frontend engine dispatches secure HTTP requests (`GET`, `POST`, `DELETE`) to the backend API pipelines.
4. **Relational Operations:** The Express backend executes secure queries against the local SQLite database to commit registrations, clear events, or index live capacity metrics.

---

## 📸 Application Preview

Here is a visual glance at the premium corporate user interface running dynamically:

### Modern Dashboard Interface
*Clean lines, real-time analytics indicators, and contextual actions.*
![Dashboard View](https://github.com/aliyahyayev/event-management-system/raw/main/screenshots/dashboard.png)

### In-App Context Alerts
*Dynamic slide-in notification toasts replacing typical native browser popups.*
![Toast View](https://github.com/aliyahyayev/event-management-system/raw/main/screenshots/toasts.png)

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone [https://github.com/aliyahyayev/event-management-system.git](https://github.com/aliyahyayev/event-management-system.git)
cd event-management-system
