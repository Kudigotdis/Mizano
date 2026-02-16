"""
MIZANO SHOPPING DATA GENERATOR
Generates shopping_items.js with realistic product data matching the placeholder images.
"""

import json
import os
import random

# Category hierarchy (matching the image generator)
CATEGORIES = {
    "Sports & Performance": ["Apparel (Kits/Boots)", "Equipment (Balls/Rackets)", "Field Tech (Wearables)", "Second-hand/Refurbished Gear"],
    "Wellness & Recovery": ["Physiotherapy/Massage", "Vitamins & Supplements", "First Aid & Safety Kits", "Gym & Studio Memberships"],
    "Nutrition & Hydration": ["Athlete Meal Prep", "Sports Drinks/Electrolytes", "Healthy Snacks", "Bulk Grains & Produce"],
    "Hobby & Creative Arts": ["Art Supplies (Paint/Clay)", "Musical Instruments", "Photography Gear", "Crafting Tools"],
    "Digital & Esports": ["Gaming Consoles/PC Parts", "Mobile Device Repair", "Social Data Bundles", "Video Editing Services"],
    "Automotive & Team Travel": ["Kombi/Bus Hire (Group Travel)", "Bicycle Maintenance", "Parts & Tyres", "Emergency Roadside"],
    "Agri-Business & Outdoors": ["Seeds & Tools", "Safari/Camping Gear", "Gardening Supplies", "Livestock Feed"],
    "Education & Skills": ["Coaching Manuals", "School Uniforms & Supplies", "Vocational Toolkits", "Language Learning Books"],
    "Lifestyle & Fashion": ["Local Designer Wear", "Hair & Beauty Products", "Footwear", "Jewelry/Accessories"],
    "Home & DIY": ["Hardware & Tools", "Solar Power/Tech", "Interior Decor", "Cleaning Supplies"],
    "Professional Services": ["Sports Agency/Legal", "Graphic Design (Logo/Kits)", "Accounting for Clubs", "Printing/Signage"],
    "Finance & Mobile Money": ["Pula (P) Exchange Services", "Insurance (Injury/Life)", "Mobile Money Agents", "Burial Societies"],
    "Travel & Hospitality": ["Lodge/Guesthouse Booking", "Event Ticketing", "Tour Guiding", "Catering Services"],
    "Property & Space": ["Venue Hire (Halls/Pitches)", "Office/Studio Space", "Storage Units", "Real Estate"],
    "Community Utilities": ["Private Security", "Waste Management", "Water Delivery", "Laundry Services"]
}

# Sample product names per subcategory
PRODUCT_NAMES = {
    "Apparel (Kits/Boots)": ["Soccer Kit", "Running Shoes", "Basketball Jersey", "Training Boots"],
    "Equipment (Balls/Rackets)": ["Match Ball", "Tennis Racket", "Basketball", "Badminton Set"],
    "Field Tech (Wearables)": ["Fitness Tracker", "Heart Rate Monitor", "GPS Watch", "Smart Band"],
    "Second-hand/Refurbished Gear": ["Used Soccer Boots", "Pre-owned Tennis Racket", "Refurbished Bike", "Second-hand Kit"],
    # Add more as needed...
}

# Locations in Botswana
LOCATIONS = ["Gaborone", "Block 3", "Phakalane", "Notwane", "CBD", "Francistown", "Maun", "Kasane"]

# Sellers
SELLERS = ["SportZone BW", "Wellness Hub", "Nutrition Pro", "Creative Corner", "Tech Traders", 
           "Auto Parts Plus", "Agri Supply", "EduBooks", "Fashion Forward", "DIY Masters",
           "Pro Services", "Money Matters", "Travel Desk", "Property Pros", "Community Care"]

def slugify(name):
    return name.lower().replace(" & ", "_").replace(" ", "_").replace("/", "_").replace("-", "_").replace("(", "").replace(")", "")

def generate_shopping_data():
    items = []
    item_id = 1
    
    for main_cat, subcats in CATEGORIES.items():
        main_slug = slugify(main_cat)
        
        for sub_cat in subcats:
            sub_slug = slugify(sub_cat)
            
            # Generate 10 items per subcategory (matching the 10 images)
            for img_num in range(1, 11):
                # Generate realistic product data
                base_names = PRODUCT_NAMES.get(sub_cat, [f"{sub_cat} Item"])
                product_name = random.choice(base_names) if base_names else f"{sub_cat} Item {img_num}"
                
                # Price range based on category
                if "Professional Services" in main_cat or "Property" in main_cat:
                    price = random.randint(500, 5000)
                elif "Finance" in main_cat:
                    price = random.randint(100, 1000)
                else:
                    price = random.randint(20, 500)
                
                item = {
                    "item_id": f"shop_{item_id:04d}",
                    "title": f"{product_name} #{img_num}",
                    "description": f"Quality {sub_cat.lower()} available in {random.choice(LOCATIONS)}",
                    "price_pula": price,
                    "category": main_cat,
                    "subcategory": sub_cat,
                    "image_path": f"./assets/images/shopping/{main_slug}/{sub_slug}/{main_slug}_{sub_slug}_{img_num:03d}.webp",
                    "seller": random.choice(SELLERS),
                    "location": random.choice(LOCATIONS),
                    "in_stock": random.choice([True, True, True, False]),  # 75% in stock
                    "rating": round(random.uniform(3.5, 5.0), 1),
                    "card_type": "Shopping Deal Card"
                }
                
                items.append(item)
                item_id += 1
    
    return items

def write_js_file(items, output_path):
    """Write items to a JavaScript file"""
    js_content = f"""/**
 * MIZANO SHOPPING DATA
 * Auto-generated shopping items with placeholder images
 * Total items: {len(items)}
 */

window.MIZANO_DATA = window.MIZANO_DATA || {{}};
window.MIZANO_DATA.shopping = {json.dumps(items, indent=2)};
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"✅ Generated {len(items)} shopping items")
    print(f"📄 Saved to: {output_path}")

if __name__ == "__main__":
    print("🛍️  Mizano Shopping Data Generator")
    print("=" * 50)
    
    items = generate_shopping_data()
    output_path = "data/databases/shopping_items.js"
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    write_js_file(items, output_path)
    
    # Print summary
    print(f"\n📊 Summary:")
    print(f"   - Total items: {len(items)}")
    print(f"   - Categories: {len(CATEGORIES)}")
    print(f"   - Subcategories: {sum(len(v) for v in CATEGORIES.values())}")
    print(f"   - Images referenced: {len(items)}")
