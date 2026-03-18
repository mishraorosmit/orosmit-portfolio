# Production Deployment Guide

## 1. BACKEND (Render)

1. **Commit & Push** your backend code to GitHub.
2. Go to **[Render.com](https://render.com/)**.
3. Click **New** → **Web Service**.
4. Connect the GitHub repository containing this codebase.
5. Provide a name (e.g., `orosmit-portfolio-api`).
6. Because we added `render.yaml`, Render should automatically detect the blueprint. 
   If it prompts you, configure it as:
   - **Environment:** Python
   - **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command:** `gunicorn core.wsgi:application`
7. Set the following **Environment Variables**:
   - `DJANGO_SETTINGS_MODULE` = `core.settings.prod`
   - `SECRET_KEY` = (generate a random secure string)
   - `DATABASE_URL` = (Automatically provided by the attached Render PostgreSQL DB)
   - `EMAIL_HOST_USER` = (your gmail address)
   - `EMAIL_APP_PASSWORD` = (your 16-character google app password)
   - `ALLOWED_HOSTS` = (Your render URL, e.g., `orosmit-portfolio-api.onrender.com`)
   - `CORS_ALLOWED_ORIGINS` = (Leave empty or set to `https://your-vercel-domain.vercel.app` once you have it in Step 2)
8. Click **Deploy**.

---

## 2. FRONTEND (Vercel)

1. **Commit & Push** your frontend code to GitHub.
2. Go to **[Vercel.com](https://vercel.com/)**.
3. Click **Add New** → **Project**.
4. Import your GitHub repository. (Set Root Directory to `frontend` if Vercel doesn't detect it automatically).
5. In the **Environment Variables** section, add:
   - `VITE_API_URL` = `https://orosmit-portfolio-api.onrender.com` (Replace with your actual Render URL from Step 1)
6. Click **Deploy**.

---

## 3. POST-DEPLOY SYNC

1. **Copy Render URL** → Go to your Vercel project Settings → Environment Variables. Update `VITE_API_URL` to match your exact Render backend URL.
2. **Copy Vercel URL** → Go to your Render Web Service → Environment. Update `CORS_ALLOWED_ORIGINS` to include your exact Vercel URL (e.g., `https://my-portfolio-frontend.vercel.app`).
3. **Redeploy both** services so the environment variables take effect.
4. **Test the contact form** on your live Vercel site to ensure backend communication and emails are flowing correctly.
