# SKeva Real Estate Frontend

A modern, responsive real estate website for **SKeva Real Estate** focused on property discovery and lead generation across **Coimbatore, Tamil Nadu**.

https://devanand-jayaraman.github.io/Real-Estate/

## Business Profile

- **Company:** SKeva Real Estate
- **Tagline:** Low Budget & High Budget Properties
- **Service Area:** Tamil Nadu – All Over Coimbatore
- **Phone:** +91 91592 30158
- **Instagram:** @skeva_realestate

## Project Scope

This repository contains the **frontend only** implementation using:

- HTML
- CSS
- JavaScript

All files are kept in the project root (no separate html/css/js folders), as requested.

## Pages Included

- `index.html` – Home page (hero, featured listings, about summary, testimonials)
- `about.html` – Company introduction, mission, vision, why choose us
- `listings.html` – Property listing grid with filters (budget, location, type)
- `property-details.html` – Property gallery, description, amenities, map, inquiry form
- `contact.html` – Click-to-call, WhatsApp CTA, contact form, map
- `admin.html` – Frontend admin panel to add/edit/delete listings

## Features Implemented

- Premium, responsive UI (dark green + white + gold accents)
- Mobile-friendly navigation
- Dynamic property cards
- Listing filters:
	- Budget
	- Location
	- Property Type
- Property details with simple image slider controls
- Lead capture forms (saved in browser localStorage)
- WhatsApp floating action button
- Social integration (Instagram link)
- SEO-ready structure (titles, descriptions, semantic sections)
- Frontend admin management for listings using localStorage
- Refined premium-subtle CSS animations and micro-interactions

## Data Persistence (Frontend)

This frontend uses **localStorage** for:

- Listings data
- Lead/inquiry submissions

No backend/database is included in this version.

## Run Locally

1. Open the project folder in VS Code.
2. Open `index.html` in a browser.
3. Recommended: use a local static server (e.g., VS Code Live Server) for smoother page navigation.

## File List

- `index.html`
- `about.html`
- `listings.html`
- `property-details.html`
- `contact.html`
- `admin.html`
- `styles.css`
- `script.js`

## Notes

- Admin panel actions update listing data in localStorage only.
- Clearing browser storage resets listings/leads to default behavior.

