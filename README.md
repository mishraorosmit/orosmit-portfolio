# Orosmit Portfolio — Full Stack Deployment

Modern full-stack portfolio built with Django REST Framework (Backend) and React / Vite / Framer Motion (Frontend). This repository is configured for immediate free-tier deployment on **Render.com** (Backend) and **Vercel** (Frontend).

## 1. Project Overview
- **Backend**: Django 4.2 architecture (`/backend`). Serves authenticated API endpoints, manages secure PostgreSQL connections, handles email SMTP wrapping, and processes multi-app generic models (Portfolio, Writing, Contact logic).
- **Frontend**: React 18 SPA (`/frontend`). Utilizes Zustand state management, Lenis smooth scrolling, GSAP layout tracking, and dense Framer Motion declarative animations. Styled purely without generic component libraries for a bespoke visual identity.

## 2. Local Development Setup

### Backend (Django)
```bash
cd backend
python -m venv venv
# Activate venv: `source venv/bin/activate` or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 3. Environment Variables Reference
You need separate `.env` files for both contexts.

**Backend (`backend/.env`)**
```env
SECRET_KEY=dev_key_only
DEBUG=True
ALLOWED_HOSTS=*
# DATABASE_URL= (optional for local sqlite)
EMAIL_HOST_USER=yourgmail
EMAIL_APP_PASSWORD=yourpass
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:8000
```

## 4. Deployment Guide

### A. Deploy Django to Render.com
1. Connect this GitHub repository to Render.
2. Render will automatically detect the `render.yaml` Infrastructure-as-Code file in the root directory.
3. Apply the Blueprint; this creates both the free PostgreSQL database and the Web Service.
4. Go to the newly created Web Service Dashboard -> **Environment** and set the remaining variables manually:
   - `EMAIL_HOST_USER`
   - `EMAIL_APP_PASSWORD`
   - `ALLOWED_HOSTS` = `your-app-slug.onrender.com`
   - `CORS_ALLOWED_ORIGINS` = `https://your-vercel-domain.vercel.app` (Set this after Vercel deploy).
5. The build system will automatically migrate and collect static files via Whitenoise.

### B. Deploy React to Vercel
1. Connect this GitHub repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Vercel automatically detects Vite.
4. Add the Production Environment Variable:
   - `VITE_API_URL` = `https://your-app-slug.onrender.com`
5. Deploy. The `vercel.json` file automatically maps React Router requests directly to `index.html`.

## 5. Adding Projects & Content
Once deployed, log into the `/admin` URL on your live Render REST API using your superuser credentials. 
- You can dynamically manage Portfolio modules, upload Markdown/Text Writing excerpts, and manage Resume versioning.
- The `is_active` Resume flag uses a custom overridden model signal to automatically toggle off outdated CVs.

## Post-Deploy Checklist
- [ ] Set all env vars in Render dashboard
- [ ] Set `VITE_API_URL` in Vercel dashboard  
- [ ] Update `CORS_ALLOWED_ORIGINS` with real Vercel URL
- [ ] Update `ALLOWED_HOSTS` with real Render URL
- [ ] Test contact form end-to-end
- [ ] Upload first resume via admin
- [ ] Add first 3 portfolio projects via admin
- [ ] Enable Gmail App Password and test email
