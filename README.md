# 📘 BeyondChats Blog Automation System

A full-stack automation system that scrapes blog content, enhances it using AI, and presents it through a modern frontend interface.

This project was developed as part of the **BeyondChats Technical Assignment**, with a strong focus on architecture, data flow, and scalability.

---

## 🚀 Project Overview

The **BeyondChats Blog Automation System** automates the entire lifecycle of blog content:

- Scraping articles from BeyondChats
- Enhancing content using AI (LLMs)
- Managing data through backend APIs
- Displaying results via a responsive frontend UI

The system is implemented as a **monolithic repository** containing backend, automation, and frontend codebases.

---

## 🧩 System Architecture

The project is divided into **three logical phases**:

### **Phase 1 – Blog Scraping & Backend APIs**
- Scrapes the **oldest blog articles** from BeyondChats
- Stores articles in a **MySQL database**
- Provides complete **CRUD REST APIs** using Laravel

### **Phase 2 – AI-Based Article Enhancement**
- Fetches original articles from Laravel APIs
- Searches Google for **top-ranking related articles**
- Scrapes reference content
- Uses an **LLM** to rewrite and improve articles
- Saves enhanced articles with **reference citations**

### **Phase 3 – Frontend UI**
- ReactJS application to display:
  - Original articles
  - AI-enhanced articles
- Fully responsive UI using **Bootstrap + Custom CSS**

---

## 🧱 Tech Stack

### **Backend**
- Laravel 10
- MySQL
- RESTful APIs

### **Automation & Scraping**
- Node.js
- Axios
- Cheerio
- Google Search (HTML scraping)
- LLM APIs (Groq / OpenAI / Hugging Face)

### **Frontend**
- ReactJS (JSX)
- React Router
- Bootstrap 5
- Custom CSS

---

## 🗂 Repository Structure
beyondchats-assignment/
├── backend-laravel/ # Laravel backend & APIs
├── automation-node/ # Scraping & AI automation scripts
├── frontend-react/ # React frontend application
├── diagrams/ # Architecture & data flow diagrams
└── README.md


---

## 🔁 Data Flow

1. Blogs are scraped from **BeyondChats**
2. Articles are stored in the **Laravel MySQL database**
3. Node.js automation fetches articles via API
4. Google search is performed for reference blogs
5. Reference content is scraped
6. LLM rewrites and enhances the article
7. Updated article is saved via Laravel API
8. React frontend displays original & enhanced articles

---

## 🛠 Local Setup Instructions

### **1️⃣ Laravel Backend**
```bash
cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

 Backend API runs at:
http://127.0.0.1:8000

```

 ### **2️⃣ Node Automation**
 ```bash
cd automation-node
npm install
cp .env.example .env
node index.js
## Make sure your .env file contains valid API keys for the chosen LLM provider.

```
### **3️⃣ React Frontend**
```bash
cd frontend-react
npm init
npm run dev

##Frontend runs at:
http://localhost:3000

```
### **🌐 Live Demo
# Frontend Live URL 
```bash
🔗https://your-vercel-link.vercel.app

```
### 🧪 Features Implemented
- ✔ Automated blog scraping from BeyondChats
- ✔ Laravel-based CRUD APIs
- ✔ AI-powered article rewriting
- ✔ Reference citation support
- ✔ Clean & responsive frontend UI


### ⚠️ Notes

# Partial implementations are included as allowed by the assignment guidelines
* Priority was given to:
1) System architecture
2) Data flow clarity
3) Scalability & extensibility
4) All code is original and written specifically for this assignment

### 👤 Author

Avez Edroos
Full-Stack Web Developer
India 🇮🇳