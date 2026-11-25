# DBUU Student Connect: Intra-College Mentorship Platform

> **Institution:** Dev Bhoomi Uttarakhand University (DBUU), Dehradun  
> **Faculty:** School of Engineering & Computing (SoEC)  
> **Project Supervisor:** Prof. Dr. Sumit Sharma  
> **Student Authors:**  
> - Rajat Kishore (Roll No: `24BTCSE0039`)  
> - Ansh (Roll No: `24BTCSE0340`)  
> - Yash Kholiya (Roll No: `24BTCSEAI0137`)  

---

## 📌 Project Overview
**DBUU Student Connect** is a desktop-optimized, role-based intra-college social networking, doubt resolution, and mentorship portal designed specifically for students, alumni, and faculty mentors of Dev Bhoomi Uttarakhand University.

### Key Capabilities:
- **Cohort Roles:** Tailored user profiles and badges for **Students** (`role: 'student'`), **Alumni / Pass-outs** (`role: 'passout'`), and **Faculty Mentors** (`role: 'mentor'`).
- **Academic Social Feed:** Real-time doubt posting with 1-click domain quick-tags (`#MiniProject`, `#Synopsis_Guide`, `#Placements`, `#SoEC_Notices`).
- **Direct Mentorship Messaging:** Real-time 1-on-1 private chat powered by Socket.io and MongoDB with session persistence.
- **Directory Search:** Live debounced search across students, mentors, roll numbers, and departments.
- **Intelligent AI Helpdesk (Phase 2):** Prototype semantic knowledge assistant answering curriculum, syllabus, and administrative FAQs with fallback to campus feed.

---

## 🛠️ Tech Stack
- **Frontend:** React.js 18, Tailwind CSS, Redux Toolkit, Socket.io-client, FontAwesome
- **Backend:** Node.js, Express.js (ESM), Socket.io, Mongoose (MongoDB)
- **Database:** MongoDB (Local / Atlas)
- **Styling Tokens:** Official DBUU Palette (`#172B52` Navy, `#F58220` Orange, `#FFF9F3` Cream)

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env (defaults to mongodb://localhost:27017/linkedin-clone)
npm run seed   # Seeds verified DBUU test accounts (Rajat, Dr. Sumit Sharma, Alumni)
npm run dev    # Starts backend on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend-reference
npm install
npm start      # Starts desktop portal on http://localhost:3000
```

### 3. Demo Credentials
- **Student Account:** `rajat.kishore@dbuu.ac.in` | Password: `1234`
- **Supervisor Account:** `sumit.sharma@dbuu.ac.in` | Password: `Dbuu@2026`
- **Alumni Account:** `rohan.rawat@dbuu.ac.in` | Password: `Dbuu@2026`
