from apps.blog.models import BlogPost
from django.utils.text import slugify

posts = [
    {
        "title": "Why I Teach Physics Backwards",
        "category": "teaching",
        "excerpt": "Most teachers start with formulas. I start with the question nobody asks.",
        "body": "Conceptual physics teaching is an art form. By starting with the raw, intuitive questions that students naturally have, we bypass the intimidation of complex mathematics.\n\nInstead of handing them a formula to memorize, we present a paradox. We show them something that defies their expectations of how the physical world operates. This cognitive dissonance creates a hunger for the answer.\n\nOnly then, when their curiosity is peaked, do we introduce the mathematical framework. The formula becomes a tool to satisfy their curiosity, rather than a hurdle they must blindly clear.",
        "reading_time": 4,
        "is_published": True
    },
    {
        "title": "What Makes a Poster Actually Work",
        "category": "design",
        "excerpt": "It's not about making it pretty. It's about making it felt.",
        "body": "Design philosophy often gets tangled in endless debates over grids, typography pairings, and color theory. While these are foundational tools, they are not the soul of a piece.\n\nA poster works when it arrests you. It must communicate a feeling before the viewer even has time to read the text. Visual hierarchy is simply the roadmap for that feeling.\n\nThe most successful posters I've created embrace tension—balancing negative space against dense information, or contrasting brutalist type with delicate imagery. The feeling is everything.",
        "reading_time": 3,
        "is_published": True
    },
    {
        "title": "My Django Project Structure (And Why I Stopped Changing It)",
        "category": "tech",
        "excerpt": "After 12 projects I stopped bikeshedding and locked in this structure.",
        "body": "Django architecture can be a massive rabbit hole. The framework gives you the freedom to build your apps however you want, which is both a blessing and a curse.\n\nAfter refactoring my setup across a dozen different projects, I realized the cost of context-switching between different custom architectures was far outweighing any modularity benefits.\n\nNow, I stick to a strict `apps/` directory pattern, fat models, thin serializers, and class-based views. It's boring, predictable, and incredibly fast to iterate upon.",
        "reading_time": 5,
        "is_published": True
    }
]

for p in posts:
    slug = slugify(p['title'])
    BlogPost.objects.update_or_create(
        slug=slug,
        defaults={
            'title': p['title'],
            'category': p['category'],
            'excerpt': p['excerpt'],
            'body': p['body'],
            'reading_time': p['reading_time'],
            'is_published': p['is_published']
        }
    )

print("Seeded 3 blog posts successfully.")
