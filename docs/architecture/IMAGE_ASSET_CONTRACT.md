# Image Asset Contract

To ensure 60fps performance and offline reliability in the Android Studio Otter Pipeline, all image assets must adhere to this local pathing and fallback contract.

## 1. Directory Structure

All paths are relative to the project root.

| Category | Path | Purpose |
| :--- | :--- | :--- |
| **Avatars** | `./images/avatars/` | User profile photos (WebP preferred). |
| **Logos** | `./images/logos/` | Team, Club, and Business logos. |
| **Placeholders** | `./images/placeholders/` | Fallback assets for missing files. |
| **Icons** | `./images/icons/` | UI buttons and navigation symbols. |

## 2. Placeholder Strategy

| Asset Type | Primary Placeholder | Logic |
| :--- | :--- | :--- |
| **User Avatar** | `./images/placeholders/user.webp` | Generic silhouette for profiles. |
| **Team Logo** | `./images/placeholders/team.webp` | Generic shield for sports teams. |
| **Business/Venue** | `./images/placeholders/venue.webp` | Generic building for places. |

## 3. Fallback Logic (Pure JS)

Avoid external CDN fallbacks. Use local event-based redirection.

```javascript
/* Standard Mizano Image Handling */
function getMizanoImagePath(category, fileName) {
    if (!fileName) return `./images/placeholders/${category}.webp`;
    return `./images/${category}/${fileName}`;
}

function handleImageError(img, category) {
    img.onerror = null; // Prevent infinite loop
    img.src = `./images/placeholders/${category}.webp`;
}
```

## 4. Constraint Rules
- **No Base64**: Prevents memory bloat in WebView during heavy scroll.
- **No External URLs**: All assets must survive an airplane-mode state.
- **WebP Encoding**: Mandatory for Android APK size optimization.
