# 💸 SpendWise – AI Powered Smart Finance Advisor

SpendWise is a modern full-stack web application that helps users track, manage, and analyze their personal finances efficiently.  
It provides detailed insights into spending habits, visual analytics, and AI-powered financial suggestions to help users make smarter financial decisions.

---

## 🚀 Features

- 📊 Track daily income and expenses
- 📈 Interactive dashboards with analytics and charts
- 🧾 Categorize transactions (Food, Travel, Bills, Shopping, etc.)
- 🤖 AI Financial Advisor powered by Gemini API
- 📅 Monthly spending trend analysis
- 🥧 Expense distribution visualization using donut charts
- 🔐 Secure authentication and protected routes
- 👤 User registration and login system
- ⚡ Responsive and modern UI design

---

# 🛠️ Tech Stack

## 🎨 Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- Heroicons
- Lucide React

## ⚙️ Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- Jackson Databind

## 🗄️ Database
- MySQL

## 🤖 AI Integration
- Google Gemini API

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/manojkumar-45/spendwise-ai-finance-advisor.git
cd spendwise-ai-finance-advisor
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3️⃣ Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🌐 API Configuration

Configure Gemini API and MySQL credentials inside:

```bash
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/spendwise
spring.datasource.username=root
spring.datasource.password=your_password

gemini.api-key=YOUR_API_KEY
gemini.model=gemini-1.5-flash
```

---

# 📂 Project Structure

```bash
spendwise-ai-finance-advisor/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── charts/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── dto/
│   └── config/
│
├── screenshots/
└── README.md
```

---

# 📊 Main Modules

- 🏠 Dashboard
- 💳 Transactions Management
- 📈 Reports & Analytics
- 🤖 AI Financial Advisor
- ⚙️ User Settings
- 🔐 Authentication System

---

# 🔒 Security Features

- Spring Security integration
- Protected frontend routes
- Secure API handling
- User authentication validation

---

# 🎯 Future Improvements

- 🤖 Advanced AI expense prediction
- 📱 Better mobile responsiveness
- 📊 Advanced financial analytics dashboard
- 🌍 Multi-currency support
- ☁️ Cloud deployment
- 📥 Export reports as PDF/Excel
- 🔔 Expense alerts and notifications

---
