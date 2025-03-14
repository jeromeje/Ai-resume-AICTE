

import streamlit as st
from pymongo import MongoClient
import hashlib
from PyPDF2 import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import os

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017/"  # Change this for MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client.resume_screening
users_collection = db.users
jobs_collection = db.jobs
resumes_collection = db.resumes

# --- User Authentication Functions ---
def make_hashes(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_hashes(password, hashed_text):
    return make_hashes(password) == hashed_text

def register_user(username, password):
    if users_collection.find_one({"username": username}):
        return False
    users_collection.insert_one({"username": username, "password": make_hashes(password)})
    return True

def authenticate_user(username, password):
    user = users_collection.find_one({"username": username})
    if user and check_hashes(password, user['password']):
        return True
    return False

# --- Job Handling ---
def save_job(description, assigned_to):
    jobs_collection.insert_one({"job_description": description, "assigned_to": assigned_to})

def get_jobs():
    return list(jobs_collection.find())

def get_job_by_id(job_id):
    return jobs_collection.find_one({"_id": job_id})

# --- Resume Processing & Ranking ---
def extract_text_from_pdf(pdf_file):
    pdf_reader = PdfReader(pdf_file)
    text = "".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
    return text

def save_resume(job_id, username, resume_name, resume_text):
    resumes_collection.insert_one({"job_id": job_id, "username": username, "resume_name": resume_name, "resume_text": resume_text})

def rank_resumes(job_description, resumes):
    resume_texts = [resume['resume_text'] for resume in resumes]
    documents = [job_description] + resume_texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    similarity_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    return similarity_scores[0]

def main_app():
    if "logged_in" not in st.session_state:
        st.session_state.logged_in = False

    if not st.session_state.logged_in:
        choice = st.sidebar.selectbox("Menu", ["Login", "Register"])
        if choice == "Login":
            login_page()
        elif choice == "Register":
            register_page()
    else:
        st.title("AI Resume Screening and Candidate Ranking")
        if st.session_state.username == "admin":
            st.subheader("Admin Panel - Assign Jobs")
            new_job_description = st.text_area("Enter job description")
            assigned_user = st.text_input("Assign to (username)")
            if st.button("Save Job"):
                save_job(new_job_description, assigned_user)
                st.success("Job assigned successfully!")

        st.subheader("Upload Resume for Job")
        jobs = get_jobs()
        job_options = {str(job['_id']): job['job_description'] for job in jobs}
        selected_job_id = st.selectbox("Select Job", options=job_options.keys(), format_func=lambda x: job_options[x])
        uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])
        if uploaded_file and st.button("Submit Resume"):
            resume_text = extract_text_from_pdf(uploaded_file)
            save_resume(selected_job_id, st.session_state.username, uploaded_file.name, resume_text)
            st.success("Resume uploaded successfully!")

        if st.session_state.username == "admin":
            st.subheader("Rank Resumes")
            job_selected_for_ranking = st.selectbox("Select Job for Ranking", options=job_options.keys(), format_func=lambda x: job_options[x])
            job_description = get_job_by_id(job_selected_for_ranking)['job_description']
            resumes = list(resumes_collection.find({"job_id": job_selected_for_ranking}))
            if resumes and st.button("Rank Resumes"):
                scores = rank_resumes(job_description, resumes)
                results = pd.DataFrame({"Candidate": [resume['username'] for resume in resumes], "Resume Name": [resume['resume_name'] for resume in resumes], "Match Score": scores})
                results = results.sort_values(by="Match Score", ascending=False)
                st.dataframe(results)
                if st.button("Download CSV"):
                    results.to_csv("resume_ranking.csv", index=False)
                    st.success("CSV downloaded successfully!")

if __name__ == "__main__":
    main_app()
