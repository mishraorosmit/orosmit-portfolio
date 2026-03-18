import os
import re

base = "C:/Users/Orosmit Mishra/Desktop/PORTFOLIO-OROSMIT12/orosmit-portfolio/frontend/src/"

# 1. Strip useSmoothScroll hook imports and calls from pages since it is handled by lenis globally now
pages_dir = os.path.join(base, "pages")
for file in os.listdir(pages_dir):
    if file.endswith(".jsx"):
        filepath = os.path.join(pages_dir, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'import\s+{\s*useSmoothScroll\s*}\s+from\s+[\'"]@/hooks/useSmoothScroll[\'"];?\s*', '', content)
        content = re.sub(r'useSmoothScroll\(\);\s*', '', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# 2. Add IDs to sections if missing and ensure standard padding (py-24 md:py-32)
sections_dir = os.path.join(base, "components", "sections")
sections_map = {
    'HeroSection.jsx': 'hero',
    'AboutSection.jsx': 'about',
    'SkillsSection.jsx': 'skills',
    'PortfolioSection.jsx': 'portfolio',
    'TeachingSection.jsx': 'teaching',
    'WritingSection.jsx': 'writing',
    'BrandSection.jsx': 'brand',
    'ContactSection.jsx': 'contact'
}

for file, section_id in sections_map.items():
    filepath = os.path.join(sections_dir, file)
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if f'id="{section_id}"' not in content:
        content = re.sub(r'<section([^>]*)>', lambda m: f'<section id="{section_id}" {m.group(1)}>' if 'id=' not in m.group(0) else m.group(0), content, count=1)
        
    # Replace padding (e.g. py-32 or py-24 to py-24 md:py-32) inside the section tag
    content = re.sub(r'(<section.*?className="[^"]*)py-\d+([^"]*">)', r'\1py-24 md:py-32\2', content, count=1)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Patch applied.")
