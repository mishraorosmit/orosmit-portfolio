import os

base = "C:/Users/Orosmit Mishra/Desktop/PORTFOLIO-OROSMIT12/orosmit-portfolio/backend/apps/"
apps = ["resume", "contact", "portfolio", "writing"]

for app in apps:
    mig_dir = os.path.join(base, app, "migrations")
    os.makedirs(mig_dir, exist_ok=True)
    init_file = os.path.join(mig_dir, "__init__.py")
    if not os.path.exists(init_file):
        with open(init_file, 'w') as f:
            f.write("")

print("Migrations directories created.")
