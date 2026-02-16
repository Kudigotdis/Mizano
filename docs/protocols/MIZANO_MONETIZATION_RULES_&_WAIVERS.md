MIZANO_MONETIZATION_RULES_&_WAIVERS.md

# Mizano Monetization Rules & Waivers
**Version 2.5 | February 2026**  
*Incorporating Village-Free Model, Transparent Pricing & Data Ethics*

---

## 1. Introduction

Mizano’s monetization philosophy is rooted in **community-first sustainability**. We generate revenue only from areas and services that can afford to pay, while keeping all core features **free in rural villages**. This document outlines every revenue stream, pricing rule, waiver eligibility, data insight product, and payment term – all designed to be transparent, ethical, and aligned with Botswana’s grassroots sports ecosystem.

**Key references:**
- [Mizano Project Summary (v2.0)](PROJECT_SUMMARY.md) – overall vision, user journeys, Event Lab, and design principles.
- [Mizano Page Flow Architecture](MIZANO_PAGE_FLOW_ARCHITECTURE.md) – navigation maps, where monetization touchpoints appear.

---

## 2. Core Principles

| # | Principle | Description |
|---|-----------|-------------|
| 1 | **Village-First Philosophy** | All features free in rural areas to promote grassroots sports & community development. |
| 2 | **Non-Sleazy Revenue** | Money from reach (city subscriptions), transactions (5% commissions), and physical value (venue bookings). |
| 3 | **Data as Public Good** | Aggregated demographics/health/planning data monetized **ONLY** for research, government & NGO use – never for advertising. |
| 4 | **Transparent Pricing** | Users see exact fees (e.g., 5% sponsorship commission shown at payment, not hidden). |
| 5 | **Community Investment** | Villages grow user base → Cities fund operations → Data insights fund expansion. |

---

## 3. Revenue Streams at a Glance

| Revenue Stream | Target Users | Pricing | Village Waiver? | Est. % of Total Revenue |
|----------------|--------------|---------|-----------------|--------------------------|
| Sponsorship Commissions | All users/groups | 5% of funds raised | No waiver | 35% |
| Venue Booking Fees | Businesses | 5% standard / 10% instant | No waiver | 25% |
| Business Subscriptions | City businesses | P100–200/month | **YES** if village non‑profit | 15% |
| Data Insights Sales | Researchers/Govt/NGOs | P5,000–50,000/report | N/A | 15% |
| School Subscriptions | Private city schools | P500/year | **YES** if govt/rural | 5% |
| Paid Ads (WebP) | Businesses | P50–200/month | No waiver | 3% |
| Micro‑Transactions | Users (CV export, Lost & Found boost) | P2–10 per action | No waiver | 2% |

**UI/UX references:**  
- Sponsorship appears in **Event Lab → Mizano Fund** and on **Activity Page → Sponsors Tab**.  
- Venue booking flows are accessed via **Venue Pages** and the **Add Menu (+)**.  
- Business subscriptions are managed in **Settings → Account & Profile** (upgrade to Business).  
- Data Insights purchases happen through direct contracts (see Section 8).  
- Micro‑transactions (CV export, Lost & Found boost) are triggered from **Player Profile** and **Bulletin Editor**.

---

## 4. Profile Types – Pricing & Waiver Rules

All profiles are free except where noted. Paid profiles are eligible for **Village Waivers** (see Section 7).

| Profile Type | Base Price | Billing Cycle | Village Waiver Eligible? | Waiver Conditions | Free Trial Period | Key Features |
|--------------|------------|---------------|--------------------------|--------------------|-------------------|---------------|
| Browser | FREE | N/A | N/A | Default entry state | N/A | Teaser access, swipe panels, no joins |
| User | FREE | N/A | N/A | Base registered profile | N/A | Full access, favorites, Bulletin, non‑competitive joins |
| Player | FREE | N/A | N/A | Upgrade from User | N/A | Competitive joins, Borrow Score, health logs, call‑out targeting |
| Mentor | FREE | N/A | N/A | Volunteer community role | N/A | Directory listing, mentee tracking, opportunity notifications |
| Guardian | FREE | N/A | N/A | Required for under‑16 | N/A | Dashboard, approvals, Security Log, AcademicAlert |
| Creator | FREE | N/A | N/A | Single event organizing | N/A | Event creation, rosters, call‑outs, Sponsor‑a‑Game |
| Group/Club | **P100** | Monthly | **YES** | Non‑profit in village | 30 days | Recurring events, wishlists, shared trophies |
| Business | **P100–200** | Monthly | **YES** | Non‑profit service in village | 30 days | Listings, sponsorships, verified badge, analytics |
| Association | **P150** | Monthly | **YES** | Govt‑recognized OR community body in village | 60 days | News Flash, tournament verification, player tallies |
| Educational Institution | **P500** | Annual | **YES** | Government school OR rural/village private school | 90 days (1 term) | Student management, leagues, talent flagging, Sports CV |
| Staff | N/A | N/A | Internal | Mizano employees only | N/A | Equipment ledger, moderation, first‑aid coordination |
| Admin | N/A | N/A | Internal | Founder/core team only | N/A | Full system oversight, analytics, fee management |

**Waiver application flow:**  
During registration for paid profiles, users can submit a waiver request. The system checks location and proof (see Section 7). Approved waivers are logged and applied indefinitely.

---

## 5. Transaction‑Based Commissions

All transactions are processed through integrated payment gateways (MTN Mobile Money, Orange Money, PayPal). Mizano’s commission is clearly displayed before payment.

| Transaction Type | Who Pays | Base Amount (P) | Mizano Commission % | Mizano Revenue (P) | Revenue Share Partner | Partner % | Notes |
|------------------|----------|-----------------|---------------------|---------------------|-----------------------|-----------|-------|
| Sponsor‑a‑Game (Money) | Business/Individual | 500 | 5% | 25 | None | – | Transparent to users – shown at payment |
| Sponsor‑a‑Game (Equipment) | Business | 0 | 0% | 0 | None | – | In‑kind donations not charged |
| Venue Booking (Standard) | User/Creator | 100 | 5% | 5 | Venue Owner | 95% | Venue sets price, we take 5% |
| Venue Booking (Instant) | User/Creator | 100 | 10% | 10 | Venue Owner | 90% | Auto‑approval premium |
| Sports CV PDF Export | Player | 10 | 100% | 10 | None | – | Admin fee for document generation |
| Lost & Found Boost | User | 2 | 100% | 2 | None | – | Area‑wide call‑out notification |
| Tournament Management Suite | Association/School | 100 | 100% | 100 | None | – | One‑time software license fee |
| Recruitment Discovery Query | Association/Scout | 10 | 70% | 7 | School | 30% | P7 to Mizano, P3 to School for data quality |
| School Talent Analytics (Annual) | Association | 500 | 70% | 350 | Schools (aggregate) | 30% | Split across schools in query results |

**UI/UX references:**  
- **Sponsor‑a‑Game** buttons appear on Activity Pages and in Event Lab.  
- **Venue Booking** is initiated from Venue Pages → “Book Now” triggers payment flow.  
- **Sports CV Export** is in Player Profile → “Export PDF”.  
- **Lost & Found Boost** is a toggle when posting to Bulletin.  
- **Recruitment Discovery** is a paid feature for Associations in the search interface.  
- **School Talent Analytics** is sold via direct contract (see Section 8).

---

## 6. Data Insights Business Model – “Public Good” Model

**Philosophy:** Mizano collects rich demographic, health, and activity data as a byproduct of the platform. This data, when **AGGREGATED and ANONYMIZED**, is monetized **ONLY** for public good purposes (research, policy, development). **Never for advertising or commercial exploitation.**

### Data Products & Pricing

| Data Product | Data Sources | Target Buyers | Use Cases | Pricing Model | Price (P) | Delivery Format |
|--------------|--------------|---------------|-----------|---------------|-----------|-----------------|
| Neighbourhood Activity Report | Community_Engagement sheet | Government, Urban Planners | Resource allocation, facility planning | Per neighbourhood | 5,000 | PDF + Excel dataset |
| Youth Health & Fitness Profile | Demographics_Health, Players_Extended | Ministry of Health, WHO, NGOs | Public health programs, nutrition initiatives | Per district | 15,000 | Anonymized aggregate stats |
| Infrastructure Gap Analysis | City_Planning_Insights, Venues | Municipal authorities, Developers | Venue construction priorities | Per city/region | 25,000 | Interactive dashboard + report |
| Talent Pipeline Overview | Players_Extended, Educational_Institutions | Botswana Football Assoc, Athletics Assoc | National team recruitment, grassroots investment | National (annual) | 50,000 | Monthly updates + raw data |
| Socioeconomic Indicators | Demographics_Health (DataSaverMode, DeviceType) | World Bank, Academic researchers | Digital divide studies, poverty mapping | National (annual) | 30,000 | Research‑grade dataset + methodology |
| Equipment Utilization Study | Equipment_Ledger, Equipment_Inventory | Sports councils, Donors (UNICEF) | Donation targeting, maintenance budgets | Per Game Cube network | 10,000 | Efficiency metrics + recommendations |
| Community Engagement Index | Community_Engagement, Activity_Participants | NGOs (community development) | Program impact measurement | Per village/town | 8,000 | Comparative analysis + trends |
| School Sports Performance | Educational_Institutions, Activity_Participants | Ministry of Education | Inter‑school league planning, PE curriculum design | National (annual) | 20,000 | School‑by‑school breakdown |

### Estimated Annual Data Revenue

| Scenario | Description | Calculation | Total (P) |
|----------|-------------|-------------|-----------|
| Conservative (Year 1‑2) | 2 govt contracts + 1 NGO study | 2×25,000 + 1×15,000 | **71,000** |
| Growth (Year 3‑5) | 5 govt + 3 NGO + 2 academic | 5×25,000 + 3×15,000 + 2×30,000 + 1×50,000 + 1×25,000 | **235,000** |
| Maturity (Year 5+) | All products sold multiple times annually | (Sum of all 8 products) ×3 | **489,000** |

---

## 7. Privacy & Ethical Guardrails

**CRITICAL:** Data is **NEVER** sold for advertising or commercial exploitation.

| Data Category | Sensitivity | Who Can Access Raw Data | Aggregation Required? | Use Restrictions | Audit Trail |
|---------------|-------------|-------------------------|-----------------------|------------------|-------------|
| Personal Identity (Name, WhatsApp) | **HIGH** | Admin only | MUST anonymize | NEVER shared externally | Every access logged |
| Health Data (Blood type, Allergies) | **HIGH** | Guardian + School + Staff | MUST aggregate (no individuals) | Research/public health ONLY | Guardian Security Log visible |
| Activity Participation | **MEDIUM** | Creator + Staff | Aggregate by neighbourhood | Community insights, planning | Profile views logged |
| Borrow Score | **MEDIUM** | Player + Staff | Aggregate by area | Equipment planning, not credit scoring | Override audit trail |
| School Academic Data | **HIGH** | School + Guardian ONLY | NEVER shared | Internal use only | Three‑way handshake logged |
| Demographic (Age, Gender, Location) | **LOW** | Researchers (aggregated) | Minimum 50‑person groups | Policy/planning/academic | Data export logged |
| Equipment Utilization | **LOW** | Public (Game Cube level) | No aggregation needed | Resource allocation | Not logged (public data) |
| Socioeconomic Indicators | **MEDIUM** | Govt/NGOs (aggregated) | Village/Area level minimum | Development programs | Buyer contract required |

### Compliance Notes
1. All data sales require **Admin approval + signed contract** specifying use restrictions.
2. Buyers must certify use for **public good** (research, policy, development) – **NO commercial advertising**.
3. Minimum aggregation: **50 individuals OR Village/Area level** (never individual profiles).
4. **Guardian Security Log** shows every Association/Creator view of minor’s profile – transparency enforced.
5. Data exports logged in `Audit_Trail` with buyer name, purpose, dataset scope, expiration date.
6. **Botswana Data Protection Act** compliance: Data stored locally, cross‑border transfers require approval.
7. Annual third‑party audit of data sales ensures no advertising/exploitation leakage.

---

## 8. Village Waiver Rules – “Free for Communities”

**Core Belief:** Villages and rural areas are where Botswana’s grassroots talent lives. Mizano must be free there to promote sports, health, and community. Cities subsidise villages. **This is non‑negotiable.**

### Waiver Eligibility Criteria

| Profile Type | Geographic Requirement | Additional Conditions | Proof Required | Auto‑Waiver? | Admin Approval? | Examples |
|--------------|------------------------|-----------------------|----------------|--------------|-----------------|----------|
| Group/Club | Located in village | Non‑profit status | Registration certificate | NO | YES | Block 3 Youth Soccer Club, Molepolole Chess Club |
| Business | Located in village | Non‑profit community service | Registration + service description | NO | YES | Free village clinic, community centre |
| Association | Village‑based OR govt‑recognised | Community/govt body | Govt registration number | YES (if govt) | ONLY if private | Local youth development association |
| Educational Institution | Government school OR rural private | Official school status | .gov email OR rural location proof | YES (govt schools) | ONLY private rural | Govt primary schools, rural private schools |

### Waiver Verification Process

| Step | Action |
|------|--------|
| 1 | Profile submits waiver request during registration (or later in Settings). |
| 2 | System checks: Village location? Govt‑recognised? (.gov email?) |
| 3 | If **AUTO‑WAIVER** criteria met → Instant approval, logged in Audit_Trail. |
| 4 | If **ADMIN‑APPROVAL** required → Queued in Admin dashboard. |
| 5 | Admin reviews: Registration certificate, non‑profit status, service description. |
| 6 | Admin approves/denies with reason → Logged in Audit_Trail. |
| 7 | Applicant notified via WhatsApp → If approved, subscription fee waived indefinitely. |

### What Qualifies as “Village”?

| Category | Definition | Examples |
|----------|------------|----------|
| **Village** | Population < 15,000 | Molepolole, Maun, Serowe, Kanye, Mochudi, Mahalapye |
| **Town** | Population 15,000–100,000 | Francistown, Selibe‑Phikwe, Palapye |
| **City** | Population > 100,000 OR capital | Gaborone only (as of 2026) |
| **Waiver Status** | Villages = **FREE** | Towns = **CASE‑BY‑CASE** | Cities = **PAID** |

---

## 9. Payment Terms & Gateway Fees

### Accepted Payment Methods

| Payment Method | Transaction Fee | Processing Time | User Preference | Integration Partner | Notes |
|----------------|-----------------|-----------------|------------------|---------------------|-------|
| MTN Mobile Money | 2.5% | Instant | **HIGH (70%)** | MTN Botswana | Most popular in Botswana |
| Orange Money | 2.5% | Instant | **MEDIUM (20%)** | Orange Botswana | Second choice |
| PayPal | 3.9% + P0.30 | 24–48 hours | **LOW (10%)** | PayPal International | For international buyers (data insights) |

### Net Revenue Impact Example

| Transaction | Gross Revenue (P) | Gateway Fee (P) | Net to Mizano (P) |
|-------------|-------------------|-----------------|-------------------|
| P500 Sponsorship (5% commission) | 25 | 0.63 | 24.37 |
| P100 Venue Booking (5% commission) | 5 | 0.13 | 4.87 |
| P100 Business Subscription | 100 | 2.50 | 97.50 |

*Formula: Net = Gross × (1 – gateway fee %)*

### Refund Policy

| Item | Refund Terms | Notes |
|------|--------------|-------|
| Subscriptions | Full refund within 7 days of payment if no usage; after 7 days, prorated refund for remaining months | – |
| Sponsorships | Refund ONLY if event cancelled by Creator; gateway fees NOT refunded | – |
| Venue Bookings | Full refund if cancelled 24+ hours before; no refund within 24 hours | venue already reserved |
| Micro‑Transactions | No refunds for completed services (CV export, boost) | refund if service failed to deliver |

---

## 10. Data Insights Contract Template (Required Clauses)

All data sales must be accompanied by a signed contract containing the following clauses:

1. **Purpose Restriction** – Buyer certifies data will be used ONLY for: (a) Academic research, (b) Public policy development, (c) Community health programs, (d) Urban planning. **NEVER for advertising, marketing, or commercial exploitation.**
2. **Anonymization Guarantee** – All data provided is aggregated with minimum 50 individuals OR Village/Area level. No individual profiles, names, or contact information included.
3. **Data Handling** – Buyer agrees to: (a) Store data securely (encrypted at rest), (b) Not re‑sell or share data, (c) Delete data within 12 months OR at contract end, whichever is sooner.
4. **Attribution Requirement** – Any publication/report using Mizano data must cite: *“Data provided by Mizano – Botswana Grassroots Sports Platform”*. Copy of final report provided to Mizano.
5. **Audit Rights** – Mizano reserves right to audit Buyer’s use of data within contract period. Non‑compliance results in immediate contract termination + penalties.
6. **Expiration & Renewal** – Contract expires after 12 months. Data access terminates. Renewal requires new contract + updated pricing.
7. **Botswana Data Sovereignty** – Data remains on Botswana servers. Cross‑border transfers require separate approval. Buyer’s use subject to Botswana Data Protection Act.
8. **No Warranty** – Data provided “as‑is”. Mizano not liable for decisions made based on data. Buyer responsible for validation and interpretation.

### Pricing Calculation Example

| Data Product | Base Price (P) | Geographic Scope | Total Price (P) |
|--------------|----------------|------------------|-----------------|
| Youth Health Profile | 15,000 | 1 District (Gaborone) | 15,000 |
| Infrastructure Gap Analysis | 25,000 | National | 25,000 |
| Custom Multi‑Year Study | 50,000 | National (3 years) | 150,000 |

---

## 11. Revenue Projections (3‑Year Model)

**Key Assumptions (user‑adjustable)**

| Parameter | Year 1 Value |
|-----------|--------------|
| Total Users (Year 1) | 10,000 |
| Growth Rate (Year 2) | 1.5× |
| Growth Rate (Year 3) | 2× |
| % Users in Villages | 60% |
| % Users in Cities | 40% |
| City Business Conversion Rate | 5% |
| Avg Sponsorships per Month | 50 |
| Avg Sponsorship Amount (P) | 500 |
| Venue Bookings per Month | 100 |
| Avg Venue Booking (P) | 100 |
| Data Insights Contracts (Year 1) | 3 |
| Data Insights Growth Rate | 1× (doubles each year) |

### Revenue Streams (Pula)

| Revenue Stream | Year 1 | Year 2 | Year 3 | Notes |
|----------------|--------|--------|--------|-------|
| Sponsorship Commissions | 15,000 | 22,500 | 45,000 | 5% of P500 × 50/month × 12 |
| Venue Bookings | 6,000 | 9,000 | 18,000 | 5% of P100 × 100/month × 12 |
| Business Subscriptions | 28,800 | 43,200 | 86,400 | City users × 5% × P100 × 12 |
| Data Insights | 75,000 | 150,000 | 300,000 | P25,000 avg × contracts (3 → 6 → 12) |
| Micro‑Transactions | 12,000 | 18,000 | 36,000 | 10% of users pay P10/year |
| **TOTAL ANNUAL REVENUE** | **136,800** | **242,700** | **485,400** | |

*Detailed formulas in `Revenue_Projections` sheet.*

---

## 12. Integration with Mizano Design & Page Flow

Monetization features are woven into the user experience as described in the [Project Summary](PROJECT_SUMMARY.md) and [Page Flow Architecture](MIZANO_PAGE_FLOW_ARCHITECTURE.md). Below are key touchpoints:

### Sponsorship Commissions
- **Event Lab → Mizano Fund** – Organisers set up fundraising goals, and the 5% commission is shown transparently before any payment.
- **Activity Page → Sponsors Tab** – Users see progress bars and can contribute; the fee is displayed at checkout.

### Venue Booking Fees
- **Venue Pages** – “Book Now” triggers a payment flow with a clear breakdown: venue price + 5% Mizano fee (or 10% for instant booking).
- **Booking confirmation** is sent via WhatsApp, and the fee is deducted automatically.

### Business Subscriptions & Waivers
- **Settings → Account & Profile** – Users can upgrade to Business profile and manage subscription.
- **During registration** – If the user’s location is a village, they are prompted to apply for a waiver (upload proof). The waiver request appears in Admin dashboard.

### Data Insights Sales
- **Admin Dashboard** – A dedicated section for managing data contracts, generating reports, and tracking audits.
- **Buyers** – Contact Mizano directly (via website or WhatsApp) to initiate a contract; payment is handled through PayPal or bank transfer.

### Micro‑Transactions
- **Player Profile → “Export Sports CV”** – P10 fee (gateway fees deducted) generates a PDF.
- **Bulletin Editor → Lost & Found** – Optional “Boost for P2” sends an area‑wide notification.

### Village Waiver Verification
- **Registration Flow** – After selecting a paid profile type, users in villages see a “Request Waiver” button. The system checks location and prompts for proof.
- **Admin Queue** – Pending waivers appear in Admin’s notification panel (with a badge count). Approval/denial triggers a WhatsApp message to the applicant.

### Payment Gateway Integration
- All payments use **MTN Mobile Money**, **Orange Money**, or **PayPal**. The user selects their preferred method; the gateway fee is shown and deducted before Mizano’s net revenue is calculated.
- **Refund requests** are handled via Admin, with rules enforced as per Section 9.

---

## 13. Conclusion

Mizano’s monetisation rules and waivers are designed to be **transparent, fair, and community‑centric**. By keeping villages free and charging only where value is added (cities, transactions, institutional data), we ensure that grassroots sports thrive while building a sustainable business. Every fee is disclosed upfront, every waiver is verified, and every data insight sale is bound by strict ethical contracts.

**Document Owner:** Mizano Finance & Product Team  
**Last Updated:** February 13, 2026  
**Version:** 2.0  
**Cross‑References:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | [MIZANO_PAGE_FLOW_ARCHITECTURE.md](MIZANO_PAGE_FLOW_ARCHITECTURE.md)