# Mizano Asset Placement Guide

Here is exactly where to put your image files so the app recognizes them.

## 1. Create the `images` Directory
Ensure you have a folder named `images` in your main project folder:
`c:\Users\Kudzanai\Documents\2025\App Developments\Mizano\images\`

Inside `images`, create these subfolders:
- `logos` (For businesses, teams, schools)
- `icons` (For app icons, menu icons)
- `venues` (For location photos)
- `avatars` (For user profiles)

## 2. Where to Put Specific Files

### Main App Logo
- **Format:** PNG or SVG
- **Location:** `images/icons/`
- **Name:** `owl-icon.svg` (If replacing the blue owl) OR `main-logo.png`.
- **Note:** Currently, the top-left icon uses a "mask" to make it blue. If you want a full-color logo, we will need to verify the CSS. For now, place it as `images/icons/app_logo.png`.

### Business & Team Logos
- **Format:** PNG or JPG (Square is best)
- **Location:** `images/logos/`
- **Naming Rule:** The filename MUST match the `logo` property in your data.
    - *Example:* If a business has `"logo": "spar_logo.png"`, put the file at `images/logos/spar_logo.png`.
    - *Tip:* If you don't have the data linked yet, just name them clearly (e.g., `gaborone_united.png`) and we will update the data to match.

### Bottom Menu Icons
- **Format:** SVG or PNG (Transparent background)
- **Location:** `images/icons/`
- **Current Usage:** The bottom menu currently uses **Emoji Text** (📍 ⚽ 🔍).
- **To Use Images:** We would need to update `index.html` to use `<img>` tags instead of emojis.
    - *Action:* Put your icon files in `images/icons/` (e.g., `nav_home.png`, `nav_search.png`) and let me know if you want to switch from Emojis to these images.

## 3. Summary Checklist
- [ ] Create `images/` folder.
- [ ] Create `images/logos/` and paste all business/team logos there.
- [ ] Create `images/icons/` and paste app icons there.
- [ ] Create `images/venues/` for any location photos.

Once you have done this, the app will automatically pick them up **IF** the data points to them. If the data is missing the `logo` link, we will need to add it.
