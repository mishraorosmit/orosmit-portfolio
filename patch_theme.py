import os
import glob
import re

src_dir = r"c:\Users\Orosmit Mishra\Desktop\PORTFOLIO-OROSMIT12\orosmit-portfolio\frontend\src"

replacements = [
    (r"#050508", "var(--bg-primary)"),
    (r"#0d0d18", "var(--bg-secondary)"),
    (r"#0a0a12", "var(--bg-card)"),
    (r"rgba\(192,192,192,0\.05\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.06\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.07\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.08\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.1\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.2\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.25\)", "var(--border)"),
    (r"rgba\(192,192,192,0\.3\)", "var(--text-muted)"),
    (r"rgba\(192,192,192,0\.4\)", "var(--text-muted)"),
    (r"rgba\(192,192,192,0\.6\)", "var(--text-secondary)"),
    (r"rgba\(192,192,192,0\.7\)", "var(--text-secondary)"),
    (r"bg-\[\#080812\]", "bg-card"),
    (r"bg-\[\#0a0a12\]", "bg-card"),
]

for filepath in glob.glob(os.path.join(src_dir, "**/*.jsx"), recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = re.sub(old, new, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
