# 🎵 Alternative Lyrics Web App – Kanban Board

## 🔵 Backlog
- [ ] Implement multi-language support
- [ ] Add lyrics version history (track changes)
- [ ] Enable community lyric submission (with admin approval)
- [ ] Add analytics for popular searches and song trends

---

## 🟡 To Do

### 🎨 Frontend
- [x ] Set up Vite + TypeScript project
- [ ] Create responsive UI layout (search, results, admin panel)
- [ ] Build search filter UI: original singer, alt creator, song names
- [ ] Display result view: lyrics, authors, YouTube links
- [ ] Integrate Google Sign-In
- [ ] Add Google AdSense ad slot

### 🧠 Backend (AWS Lambda, TypeScript)
- [ ] Create `GET /songs` (search endpoint)
- [ ] Create `POST /songs` (create entry)
- [ ] Create `PUT /songs/:id` (update entry)
- [ ] Create `DELETE /songs/:id` (delete entry)
- [ ] Add request validation and sanitization
- [ ] Add Google token auth middleware

### 🗄 Database (DynamoDB + DAX)
- [ ] Design songs table schema
- [ ] Provision table and DAX with Terraform
- [ ] Configure indexing for optimized search

### ☁️ Infrastructure (Terraform)
- [ ] Terraform: S3 static website hosting
- [ ] Terraform: Lambda + API Gateway setup
- [ ] Terraform: DynamoDB table + DAX cluster
- [ ] Terraform: IAM roles/policies
- [ ] Store secrets securely via AWS Secrets Manager or SSM

### 🧪 Testing
- [ ] Configure Jest for unit tests
- [ ] Write component-level tests (search, display)
- [ ] Configure Cypress for E2E
- [ ] Write E2E test: Search + display flow
- [ ] Write E2E test: Admin login + CRUD

### 🔁 GitHub Actions (CI/CD)
- [ ] Set up GitHub Actions workflow (main.yml)
- [ ] Add build + lint steps
- [ ] Add Jest + Cypress test steps
- [ ] Configure S3 deployment on main branch push
- [ ] Automate Lambda deploy with Terraform

---

## 🟢 In Progress
- [ x ] Vite + TypeScript project scaffolding
- [ ] Basic search UI implementation
- [ x] Initial DynamoDB table schema definition

---

## ✅ Done
*(Move completed tasks here)*

---
