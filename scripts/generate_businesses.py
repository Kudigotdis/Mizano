import json
import random
import itertools

# Load categories
with open('business_categories.json') as f:
    categories = json.load(f)

# Load villages (simplified list – full file contains more details)
with open('botswana_villages.json') as f:
    villages = json.load(f)  # expected as list of {name, city, gps}

# Business name templates per sub‑subcategory (can be extended)
NAME_TEMPLATES = {
    "Choppies": "Choppies Supermarket – {area}",
    "Spar": "Spar – {area}",
    "Pick n Pay": "Pick n Pay – {area}",
    # ... more templates for other sub‑subcategories
}

# Fallback template
DEFAULT_TEMPLATE = "{business_type} – {area}"

def generate_phone():
    return f"+267{random.randint(60000000, 72999999)}"

def generate_facebook(name):
    # Simple slug: lowercase, remove special chars
    slug = name.lower().replace(' ', '').replace('–', '').replace('-', '')
    return f"https://facebook.com/{slug}"

businesses = []
for top_cat, subs in categories.items():
    for sub, sub_subs in subs.items():
        for leaf in sub_subs:
            # For each leaf, generate 40 businesses
            for i in range(40):
                # Pick a random village/town
                loc = random.choice(villages)
                # Choose template – if leaf name matches a key, use that, else default
                template = NAME_TEMPLATES.get(leaf, DEFAULT_TEMPLATE)
                name = template.format(area=loc['name'], business_type=leaf)
                business = {
                    "business_id": f"BUS-{top_cat[:3]}-{sub[:3]}-{i+1:04d}",
                    "name": name,
                    "category_path": [top_cat, sub, leaf],
                    "location": {
                        "area": loc['name'],
                        "city": loc.get('city', loc['name']),
                        "country": "Botswana",
                        "gps": loc['gps']
                    },
                    "contact": {
                        "phone": generate_phone(),
                        "whatsapp": generate_phone(),  # could be same
                        "facebook": generate_facebook(name)
                    },
                    "verified": random.choice([True, False]),
                    "hours": "Mon-Fri 08:00-18:00, Sat 09:00-15:00"  # generic
                }
                businesses.append(business)

# Save to JSON
with open('businesses.json', 'w') as f:
    json.dump(businesses, f, indent=2)