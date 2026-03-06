# MIZANO CARDS.CSS v4.0 — INTEGRATION PROMPT

No explanations. Make only the changes listed. Do not touch any file not listed. Do not change any database files, overlay HTML, navigation, or filter logic.

---

## CONTEXT

The app uses `CardRenderer.js` to dynamically build HTML card elements from database objects and inject them into `.drop-field` containers inside each panel. The new `cards.css` (v4.0) replaces the old `cards.css` entirely. The CSS uses class names and `data-status` attributes to style cards. Your job is to:

1. Drop in the new CSS
2. Update `CardRenderer.js` so the HTML it generates matches the new class names and structure
3. Touch nothing else

---

## STEP 1 — Replace `cards.css`

Replace the entire contents of `cards.css` with the contents of the new `cards (2).css` file provided. Keep the filename as `cards.css`. Do not rename it. The `<link>` tag in `index.html` already points to `./cards.css` — do not change `index.html`.

---

## STEP 2 — Update `CardRenderer.js`

Open `CardRenderer.js`. For each card type below, find the existing render function and update **only the HTML template string** it returns. Do not change the function name, the data field mappings, the click handlers, or any logic outside the template string.

Before editing each function, read it fully to confirm which data fields it uses (e.g. `event.title`, `match.homeTeam`, etc.). Map those same fields into the new template. Do not invent field names — use whatever the function already reads from the data object.

---

### CARD TYPE 1 — Match Card

**Find:** The function that renders match/fixture cards (likely named `renderMatchCard`, `buildMatchCard`, or similar).

**New HTML template to return:**

```html
<div class="mizano-card card-match" data-status="${statusValue}">
  <div class="card-match__teams">
    <div class="card-match__team">
      <div class="card-match__logo">
        ${homeLogoHTML}
      </div>
      <div class="card-match__team-name">${homeTeamName}</div>
    </div>
    <div class="card-match__center">
      ${scoreOrTimeHTML}
      ${htScoreHTML}
      ${minuteHTML}
    </div>
    <div class="card-match__team">
      <div class="card-match__logo">
        ${awayLogoHTML}
      </div>
      <div class="card-match__team-name">${awayTeamName}</div>
    </div>
  </div>
  <div class="card-match__venue">
    ${venueName}<span class="dot-sep"></span>${locationName}
  </div>
  ${safetyFooterHTML}
</div>
```

**Rules for this card:**
- `statusValue`: map from the match's status field — `"live"` / `"upcoming"` / `"finished"`. Use the existing status mapping logic already in the function.
- `homeLogoHTML` / `awayLogoHTML`: if a logo URL exists, use `<img src="${logoUrl}" alt="${teamName}">`. If no logo, use the team's initials or a sport emoji. **No background, no border on the logo container** — the `.card-match__logo` CSS is already transparent.
- `scoreOrTimeHTML`: if live or finished, render:
  ```html
  <div class="card-match__score-row">
    <span class="card-match__score-num">${homeScore}</span>
    <div class="card-match__score-sep"><span class="colon">:</span><span class="dots">···</span></div>
    <span class="card-match__score-num">${awayScore}</span>
  </div>
  ```
  If upcoming, render: `<div class="card-match__score-time">${kickoffTime}</div>`
- `htScoreHTML`: if available, `<div class="card-match__ht">${htScore}</div>` else `""`
- `minuteHTML`: if live, `<div class="card-match__minute">${minute}'</div>` else `""`
- `safetyFooterHTML`: if a safety/guardian flag exists on the data, render:
  ```html
  <div class="card-match__footer">🔒 ${safetyMessage}</div>
  ```
  Otherwise `""`.
- **Do NOT add** any status badge label (no "Live", "Upcoming", "Finished" text inside the card).

---

### CARD TYPE 2 — Event / Registration Card

**Find:** The function that renders event or registration cards.

**New HTML template:**

```html
<div class="mizano-card card-event" data-status="${statusValue}">
  <div class="card-event__title">${eventTitle}</div>
  <div class="card-event__date">${formattedDate}</div>
  <div class="card-event__tags">
    ${tagsHTML}
  </div>
  <div class="card-event__price-bar">${priceText}</div>
</div>
```

**Rules:**
- `statusValue`: `"upcoming"` / `"official"` / `"live"` / `"recruiting"` / `"learning"` / `"finished"` — use the existing mapping.
- `formattedDate`: date only — no price in this line. If the function previously put price here, move price to the bar below.
- `tagsHTML`: render distances, categories, or sub-types as plain text separated by `<span class="dot-sep"></span>`. Example:
  ```html
  5km<span class="dot-sep"></span>10km<span class="dot-sep"></span>21km
  ```
  No `<span>` pill wrappers, no background, no border — just text and dots.
- `priceText`: "From P150" / "Free" / "P200 Entry" — whatever the price field holds. If no price, use `"Free Entry"`.
- **Do NOT** render a Register button, a divider line, or a status badge label anywhere inside this card.

---

### CARD TYPE 3 — Institution / Team / School Card

**Find:** The function that renders school, club, or institution cards.

**New HTML template:**

```html
<div class="mizano-card" data-status="official">
  <div class="card-institution">
    <div class="card-institution__logo">
      ${logoHTML}
    </div>
    <div class="card-institution__body">
      <div class="card-institution__name">
        ${institutionName}
        ${verifiedBadge}
      </div>
      <div class="card-institution__sub">${typeLabel} · ${locationLabel}</div>
      <div class="card-institution__stats">
        ${statsHTML}
      </div>
    </div>
  </div>
</div>
```

**Rules:**
- `verifiedBadge`: if verified flag is true, add `<span class="card-institution__verified">✓</span>` else `""`.
- `statsHTML`: render each stat as `<div class="card-institution__stat">${value} <span>${label}</span></div>`. Example: `<div class="card-institution__stat">850 <span>Students</span></div>`.
- **Do NOT** render a `+` button or any action button.

---

### CARD TYPE 4 — Community / Feed Card

**Find:** The function that renders community posts, social feed items.

**New HTML template:**

```html
<div class="mizano-card" data-status="${statusValue}">
  <div class="card-feed__title">${postTitle}</div>
  <div class="card-feed__body">${postBody}</div>
  <div class="card-feed__author-row">
    <div class="card-feed__avatar">
      ${avatarHTML}
    </div>
    <div class="card-feed__author-info">
      <div class="card-feed__author-name">${authorFullName}</div>
      <div class="card-feed__author-location">
        ${cityOrVillage}<span class="dot-sep"></span>${areaOrNeighbourhood}<span class="dot-sep"></span>${timeAgo}
      </div>
    </div>
  </div>
</div>
```

**Rules:**
- `avatarHTML`: if avatar URL exists, `<img src="${avatarUrl}" alt="${authorName}">`. If no URL, use first initial or a generic person emoji.
- `authorFullName`: first name + surname from the data object.
- `cityOrVillage`, `areaOrNeighbourhood`: use whatever location fields the data has. If only one location field exists, use it for `cityOrVillage` and omit the area dot-sep.
- `timeAgo`: use the existing timestamp formatting already in the function.
- **Do NOT** render: a WhatsApp button, a status pill ("Searching", "Grouping", "Contact"), a divider, or any action button.
- Post title goes first, post body second, author row last.

---

### CARD TYPE 5 — Job Listing Card

**Find:** The function that renders job listing cards.

**New HTML template:**

```html
<div class="mizano-card" data-status="official">
  <div class="card-job__title">${jobTitle}</div>
  <div class="card-job__company">${companyName} · ${location}</div>
  <div class="card-job__salary">${salaryRange}</div>
  <div class="card-job__deadline">Deadline: ${deadlineDate}</div>
</div>
```

**Rules:**
- **Do NOT** render: a company logo, a hiring badge, an Apply button, or any other element. These 4 lines are the entire card content.

---

### CARD TYPE 6 — Lost & Found Card

**Find:** The function that renders lost/found items.

**New HTML template:**

```html
<div class="mizano-card" data-status="${statusValue}">
  <div class="card-lostfound__top">
    <span class="card-lostfound__status ${statusClass}">${statusLabel}</span>
    <span class="card-lostfound__item">${itemName}</span>
  </div>
  <div class="card-lostfound__location">${locationName}<span class="dot-sep"></span>${dateFound}</div>
</div>
```

**Rules:**
- `statusClass`: `"status-found"` if found, `"status-looking"` if lost/searching.
- `statusLabel`: `"Found"` or `"Looking For"` — never use the word "Lost".
- `statusValue` (border): `"recruiting"` for found, `"official"` for looking.
- **Do NOT** render: an item image/photo, a boost badge, a star icon, or any button.

---

### CARD TYPE 7 — Poll / Engagement Card

**Find:** The function that renders poll or survey cards.

**New HTML template:**

```html
<div class="mizano-card" data-status="engagement">
  <div class="card-poll__category">${pollCategory}</div>
  <div class="card-poll__question">${pollQuestion}</div>
  <div class="card-poll__options">
    ${optionsHTML}
  </div>
  ${progressHTML}
</div>
```

**Rules:**
- `optionsHTML`: for each option, render: `<button class="card-poll__option">${optionText}</button>`
- `progressHTML`: if response count data exists:
  ```html
  <div class="card-poll__progress-label"><span>Responses</span><span>${count} voted</span></div>
  <div class="card-poll__progress-bar"><div class="card-poll__progress-fill" style="width:${percent}%"></div></div>
  ```
  Otherwise `""`.
- **Do NOT** render: any icon (📊 or otherwise), a divider line, or a header row element.

---

### CARD TYPE 8 — Challenge Card

**Find:** The function that renders neighborhood challenge or activity challenge cards.

**New HTML template:**

```html
<div class="mizano-card" data-status="recruiting">
  <div class="card-challenge__type">${challengeType}</div>
  <div class="card-challenge__goal">${goalText}</div>
  <div class="card-challenge__progress-label">
    <span>Progress</span><span>${current} / ${target} ${unit}</span>
  </div>
  <div class="card-challenge__progress-bar">
    <div class="card-challenge__progress-fill" style="width:${percent}%"></div>
  </div>
  <div class="card-challenge__participants">${participantCount} participants joined</div>
</div>
```

---

### CARD TYPE 9 — Shopping / Product Card

**Find:** The function that renders product or shopping item cards.

**New HTML template:**

```html
<div class="mizano-card" data-status="official">
  <div class="card-product__image">
    ${productImageHTML}
  </div>
  <div class="card-product__name">${productName}</div>
  <div class="card-product__category">${productCategory}</div>
  <div class="card-product__footer">
    <div class="card-product__price">${productPrice}</div>
    <div class="card-product__seller">${sellerName} · ${sellerLocation}</div>
  </div>
</div>
```

**Rules:**
- `productImageHTML`: if image URL exists, `<img src="${imageUrl}" alt="${productName}" style="width:100%;height:100%;object-fit:cover;">`. If no image, use a relevant emoji or leave the container empty.
- **Do NOT** render: a stock badge (`In Stock` / `Out of Stock`), a star rating, a rating number, or any button.

---

## STEP 3 — SAFETY CHECKS (run these before saving)

1. Open every render function you changed and confirm the data field names match what the database actually provides. If a field name you used doesn't exist on the data object, use the closest matching field that was already in the old template.

2. Confirm `data-status` values are lowercase strings matching exactly one of: `"live"`, `"upcoming"`, `"finished"`, `"recruiting"`, `"learning"`, `"engagement"`, `"official"`. No other values will receive a border color.

3. Confirm `.dot-sep` spans are self-closing inline elements with no text content: `<span class="dot-sep"></span>` — never use `·` bullet characters as separators in the new templates.

4. Confirm the `card-event` card's outer `<div>` has `class="mizano-card card-event"` and NOT `padding-bottom:0` as an inline style — the CSS handles that.

5. Confirm no render function outputs these removed elements anywhere:
   - `btn-register`, `register-btn`, or any Register/Apply/Contact/WhatsApp button inside a card
   - `card-badge`, `badge-live`, `badge-upcoming`, or any badge label
   - `card-match__logo` with `background:` or `border:` inline styles
   - `card-product__stock-badge`
   - `card-product__rating`
   - `card-feed__status` pill
   - `card-institution__action` + button

---

## DO NOT TOUCH

- `index.html` — not a single character
- Any `.js` database file
- `FilterEngine.js`, `shell.js`, `NavigationController.js`
- Any overlay HTML
- Any file not explicitly listed above
- The `cards.css` `@import` font URL
- The `:root` CSS variable block
