"""
MIZANO SHOPPING PLACEHOLDER IMAGE GENERATOR
Generates WebP placeholder images for the Shopping panel.
Each image is a colored square with category and subcategory text.
"""

import os
import hashlib
from PIL import Image, ImageDraw, ImageFont

# =============================================================================
# Configuration
# =============================================================================
OUTPUT_BASE = "assets/images/shopping"   # relative path – adjust as needed
IMAGE_SIZE = 300                          # square dimensions (pixels)
BACKGROUND_COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F1", "#F1FF33",
    "#33FFF5", "#F533FF", "#FF8C33", "#33FF8C", "#8C33FF",
    "#FF3333", "#33FF33", "#3333FF", "#FFFF33", "#FF33FF"
]
FONT_PATH = None                           # set to a .ttf path if you want a specific font
FONT_SIZE = 24

# Category hierarchy (as per Mizano Shopping panel)
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

# Helper to create a slug from a category name
def slugify(name):
    return name.lower().replace(" & ", "_").replace(" ", "_").replace("/", "_").replace("-", "_").replace("(", "").replace(")", "")

# =============================================================================
# Main generation function
# =============================================================================
def generate_placeholders():
    # Create base output directory if it doesn't exist
    os.makedirs(OUTPUT_BASE, exist_ok=True)

    # Assign a color to each main category (deterministic, for consistency)
    color_map = {}
    for idx, main_cat in enumerate(CATEGORIES.keys()):
        color_map[main_cat] = BACKGROUND_COLORS[idx % len(BACKGROUND_COLORS)]

    # Load a font – fallback to default if none specified
    try:
        if FONT_PATH:
            font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
        else:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    total_images = 0
    
    # Iterate over main categories and subcategories
    for main_cat, subcats in CATEGORIES.items():
        main_slug = slugify(main_cat)
        bg_color = color_map[main_cat]

        for sub_cat in subcats:
            sub_slug = slugify(sub_cat)

            # Create subdirectory
            sub_dir = os.path.join(OUTPUT_BASE, main_slug, sub_slug)
            os.makedirs(sub_dir, exist_ok=True)

            # Generate 10 images per subcategory
            for img_num in range(1, 11):
                filename = f"{main_slug}_{sub_slug}_{img_num:03d}.webp"
                filepath = os.path.join(sub_dir, filename)

                # Create a new image with the background color
                img = Image.new('RGB', (IMAGE_SIZE, IMAGE_SIZE), color=bg_color)
                draw = ImageDraw.Draw(img)

                # Prepare text lines
                text_lines = [
                    main_cat,
                    sub_cat,
                    f"Image {img_num}"
                ]

                # Calculate text position (centered)
                y = IMAGE_SIZE // 2 - (len(text_lines) * FONT_SIZE) // 2
                for line in text_lines:
                    # Get text bounding box (approx)
                    bbox = draw.textbbox((0, 0), line, font=font)
                    text_width = bbox[2] - bbox[0]
                    text_height = bbox[3] - bbox[1]
                    x = (IMAGE_SIZE - text_width) // 2
                    draw.text((x, y), line, fill="white", font=font)
                    y += text_height + 5

                # Save as WebP with good compression
                img.save(filepath, 'webp', quality=80, optimize=True)
                total_images += 1
                
                if total_images % 50 == 0:
                    print(f"Generated {total_images} images...")

    print(f"\n✅ Complete! Generated {total_images} placeholder images in '{OUTPUT_BASE}'")
    print(f"📁 Organized into {len(CATEGORIES)} main categories with {sum(len(v) for v in CATEGORIES.values())} subcategories")

if __name__ == "__main__":
    print("🖼️  Mizano Shopping Placeholder Generator")
    print("=" * 50)
    generate_placeholders()
