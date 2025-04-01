🎵 Alternative Lyrics Search & Management Web App – Project Summary
🧩 Project Purpose
A web app for discovering and managing alternative (2nd creation) versions of popular songs, often missed by mainstream platforms like Karaoke due to licensing. It allows users to search, view, and manage these versions while monetizing via Google AdSense.

💻 Core Features
Lyrics Search

Search by: original singer, alternative creator, song names (original/alt)

Display: original lyrics, alt lyrics, original/alt authors, YouTube links

Admin Management Console

Secure admin login via Google Sign-In

Create, update, delete song records

Authentication

Google Sign-In integration

Admin-only access to management features

Ads & Monetization

Google AdSense integration for monetization

🏗️ Technical Stack
⚙️ Frontend
Framework: Vite

Language: TypeScript

Rendering: Fully client-side

Hosting: AWS S3 (static site)

🌐 Backend
API: AWS Lambda (Node.js with TypeScript)

Auth Middleware: Google token verification

API Gateway: For exposing Lambda endpoints

🗄️ Database
Primary Store: AWS DynamoDB

Performance: Integrated with DynamoDB DAX (for search caching)

☁️ Infrastructure
IaC Tool: Terraform

Provision: S3, Lambda, API Gateway, DynamoDB, DAX, IAM roles

🔒 Authentication
Provider: Google Sign-In (OAuth)

Roles: Admin access for CRUD

🧪 Testing
Unit Testing: Jest (UI logic, utility functions)

E2E Testing: Cypress (Search flow, Admin CRUD)

🔁 CI/CD with GitHub Actions
Build: Run TypeScript build, lint checks

Test: Run Jest and Cypress tests on PRs

Deploy:

Deploy frontend to S3 on main branch push

Deploy Lambda functions using Terraform

Secrets: Manage via GitHub Secrets (Google client keys, AWS credentials)

