
AI Resume Screening and Candidate Ranking System

📌 Overview

This is a Streamlit-based web application that allows admins to create jobs, assign them to users, collect resumes, and rank candidates based on job descriptions. The system uses MongoDB for data storage and TF-IDF with Cosine Similarity for resume ranking.


---

🚀 Features

✅ User Authentication

Secure Login & Registration (using MongoDB)

Admin access to manage jobs & resumes


✅ Admin Panel

Assign Jobs to users

View & Rank submitted resumes

Download Ranked Resumes as CSV


✅ Resume Upload & Storage

Users upload resumes for assigned jobs

Resumes stored in MongoDB

Extracts text from PDF resumes


✅ AI Resume Ranking

Uses TF-IDF & Cosine Similarity for ranking

Generates sorted candidate lists



---

🏗 Tech Stack

Frontend: Streamlit

Backend: Python (Flask/Streamlit)

Database: MongoDB (Atlas/Local)

Libraries:

pymongo → MongoDB connection

PyPDF2 → Resume text extraction

scikit-learn → TF-IDF & Cosine Similarity




---

📦 Installation & Setup

1️⃣ Clone the Repository

git clone   https://github.com/jeromeje/Ai-resume-AICTE.git

2️⃣ Install Dependencies

  pip install streamlit pymongo PyPDF2 scikit-learn pandas matplotlib

3️⃣ Set Up MongoDB

  Use MongoDB Atlas or run MongoDB locally

  Create a database & collection for users, jobs, and resumes


4️⃣ Run the Application

  streamlit run app.py


---

🎯 How It Works

For Admins:

1️⃣ Log in as admin
2️⃣ Assign jobs to users
3️⃣ View submitted resumes
4️⃣ Rank resumes based on job fit
5️⃣ Download ranked resumes as CSV

For Users:

1️⃣ Register/Login
2️⃣ Upload resume for assigned job
3️⃣ Get ranked based on job description match


---

📌 To-Do & Future Enhancements

🚀 Keyword-based Filtering
🚀 Automated Skill Extraction
🚀 Graphical Resume Insights

Would you like any modifications before finalizing? 😊

