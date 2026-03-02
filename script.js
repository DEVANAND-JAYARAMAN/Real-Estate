const STORAGE_KEY_LISTINGS = "skevaListings";
const STORAGE_KEY_LEADS = "skevaLeads";

const defaultListings = [
  {
    id: "1",
    title: "Modern 2BHK Apartment",
    priceLakhs: 68,
    location: "Saravanampatti",
    type: "Apartment",
    description: "Well-designed 2BHK apartment with modern interiors, good ventilation, and quick access to IT corridors.",
    amenities: ["Covered Parking", "Lift", "24x7 Security", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
    ],
    mapEmbed: "https://www.google.com/maps?q=Saravanampatti%2C%20Coimbatore&output=embed"
  },
  {
    id: "2",
    title: "Premium Villa Community",
    priceLakhs: 220,
    location: "Vadavalli",
    type: "Villa",
    description: "Spacious independent villa in a gated community with landscaped surroundings and premium finishes.",
    amenities: ["Private Garden", "Clubhouse", "CCTV", "Children's Play Area"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"
    ],
    mapEmbed: "https://www.google.com/maps?q=Vadavalli%2C%20Coimbatore&output=embed"
  },
  {
    id: "3",
    title: "Residential Plot Near Schools",
    priceLakhs: 42,
    location: "Kovaipudur",
    type: "Plot",
    description: "DTCP-approved residential plot in a fast-growing neighborhood, ideal for custom home construction.",
    amenities: ["Clear Title", "Blacktop Road", "Water Connection Nearby", "School Access"],
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?auto=format&fit=crop&w=1200&q=80"
    ],
    mapEmbed: "https://www.google.com/maps?q=Kovaipudur%2C%20Coimbatore&output=embed"
  },
  {
    id: "4",
    title: "Retail Space in Prime Zone",
    priceLakhs: 155,
    location: "RS Puram",
    type: "Commercial",
    description: "High-footfall commercial unit suitable for retail or office use, with excellent road visibility.",
    amenities: ["Prime Frontage", "Visitor Parking", "Power Backup", "Public Transport Nearby"],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
    ],
    mapEmbed: "https://www.google.com/maps?q=RS%20Puram%2C%20Coimbatore&output=embed"
  },
  {
    id: "5",
    title: "Luxury 4BHK Sky Home",
    priceLakhs: 360,
    location: "Peelamedu",
    type: "Apartment",
    description: "Ultra-premium sky residence with panoramic city views, top-end amenities, and excellent connectivity.",
    amenities: ["Infinity Pool", "Gym", "Concierge", "Multi-level Security"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
    ],
    mapEmbed: "https://www.google.com/maps?q=Peelamedu%2C%20Coimbatore&output=embed"
  }
];

function getListings() {
  const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(defaultListings));
    return defaultListings;
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(defaultListings));
    return defaultListings;
  } catch {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(defaultListings));
    return defaultListings;
  }
}

function saveListings(listings) {
  localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
}

function formatPrice(lakhs) {
  if (lakhs >= 100) {
    return `₹ ${(lakhs / 100).toFixed(2)} Cr`;
  }
  return `₹ ${lakhs} Lakhs`;
}

function buildCard(listing) {
  return `
    <article class="card property-card">
      <img src="${listing.images[0]}" alt="${listing.title}" loading="lazy" />
      <div class="property-content">
        <h3>${listing.title}</h3>
        <p class="property-price">${formatPrice(listing.priceLakhs)}</p>
        <p class="property-meta">${listing.location} • ${listing.type}</p>
        <div class="card-actions">
          <a class="btn btn-outline" href="property-details.html?id=${listing.id}">View Details</a>
          <a class="btn btn-secondary" href="https://wa.me/919159230158?text=${encodeURIComponent(`Hi SKeva Real Estate, I'm interested in ${listing.title} in ${listing.location}.`)}" target="_blank" rel="noopener">Contact</a>
        </div>
      </div>
    </article>
  `;
}

function markActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      (page === "home" && href === "index.html") ||
      (page === "about" && href === "about.html") ||
      (page === "listings" && href === "listings.html") ||
      (page === "contact" && href === "contact.html") ||
      (page === "admin" && href === "admin.html")
    ) {
      link.classList.add("active");
    }
  });
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function renderFeatured() {
  const container = document.getElementById("featured-listings");
  if (!container) return;

  const listings = getListings().slice(0, 3);
  container.innerHTML = listings.map(buildCard).join("");
}

function budgetMatch(priceLakhs, budget) {
  if (budget === "all") return true;
  if (budget === "low") return priceLakhs < 80;
  if (budget === "mid") return priceLakhs >= 80 && priceLakhs <= 150;
  if (budget === "high") return priceLakhs > 150 && priceLakhs <= 300;
  return priceLakhs > 300;
}

function renderListingsPage() {
  const grid = document.getElementById("listings-grid");
  if (!grid) return;

  const budgetSelect = document.getElementById("filter-budget");
  const locationSelect = document.getElementById("filter-location");
  const typeSelect = document.getElementById("filter-type");

  const update = () => {
    const listings = getListings();
    const budget = budgetSelect?.value || "all";
    const location = locationSelect?.value || "all";
    const type = typeSelect?.value || "all";

    const filtered = listings.filter((item) => {
      const locationOk = location === "all" || item.location === location;
      const typeOk = type === "all" || item.type === type;
      const budgetOk = budgetMatch(item.priceLakhs, budget);
      return locationOk && typeOk && budgetOk;
    });

    if (!filtered.length) {
      grid.innerHTML = '<p class="empty">No properties match your selected filters.</p>';
      return;
    }

    grid.innerHTML = filtered.map(buildCard).join("");
  };

  [budgetSelect, locationSelect, typeSelect].forEach((el) => {
    if (el) el.addEventListener("change", update);
  });

  update();
}

function setupLeadForms() {
  const forms = document.querySelectorAll(".lead-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const lead = {
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        requirement: String(formData.get("requirement") || "").trim(),
        source: form.dataset.formType || "inquiry",
        timestamp: new Date().toISOString()
      };

      if (!lead.name || !lead.phone || !lead.requirement) return;

      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || "[]");
      existing.push(lead);
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(existing));

      const message = form.querySelector(".form-message");
      if (message) {
        message.textContent = "Thank you. Our team will contact you shortly.";
      }

      form.reset();
    });
  });
}

function renderPropertyDetails() {
  const container = document.getElementById("property-details-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const listing = getListings().find((item) => item.id === id) || getListings()[0];

  if (!listing) {
    container.innerHTML = '<p class="empty">Property not found.</p>';
    return;
  }

  const initialImage = listing.images[0];

  container.innerHTML = `
    <div class="property-detail">
      <div class="card gallery">
        <img id="main-gallery-image" class="main-image" src="${initialImage}" alt="${listing.title}" />
        <div class="slider-controls">
          ${listing.images
            .map((img, idx) => `<button class="btn btn-outline thumb-btn" data-img="${img}">${idx + 1}</button>`)
            .join("")}
        </div>
      </div>
      <div class="card">
        <h1>${listing.title}</h1>
        <p class="property-price">${formatPrice(listing.priceLakhs)}</p>
        <p class="property-meta">${listing.location} • ${listing.type}</p>
        <p>${listing.description}</p>
        <h3>Amenities</h3>
        <ul class="amenities">
          ${listing.amenities.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <h3>Inquire Now</h3>
        <form class="lead-form" data-form-type="property-${listing.id}">
          <label>Name<input type="text" name="name" required /></label>
          <label>Phone<input type="tel" name="phone" required /></label>
          <label>Requirement<textarea name="requirement" rows="3" required>Interested in ${listing.title}</textarea></label>
          <button type="submit" class="btn btn-secondary">Submit Inquiry</button>
          <p class="form-message" aria-live="polite"></p>
        </form>
      </div>
    </div>
    <div class="section" style="padding:20px 0 0;">
      <h2>Location</h2>
      <div class="map-wrap"><iframe title="Property Location" src="${listing.mapEmbed}" loading="lazy"></iframe></div>
    </div>
  `;

  const mainImage = document.getElementById("main-gallery-image");
  document.querySelectorAll(".thumb-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (mainImage) mainImage.src = button.dataset.img || initialImage;
    });
  });

  setupLeadForms();
}

function resetAdminForm(form) {
  form.reset();
  form.elements.id.value = "";
}

function setupAdminPage() {
  const form = document.getElementById("listing-form");
  const tableBody = document.querySelector("#admin-listings-table tbody");
  const resetBtn = document.getElementById("reset-listing-form");
  if (!form || !tableBody) return;

  const renderTable = () => {
    const listings = getListings();
    tableBody.innerHTML = listings
      .map(
        (item) => `
      <tr>
        <td>${item.title}</td>
        <td>${formatPrice(item.priceLakhs)}</td>
        <td>${item.location}</td>
        <td>${item.type}</td>
        <td>
          <button class="btn btn-outline edit-btn" data-id="${item.id}">Edit</button>
          <button class="btn btn-secondary delete-btn" data-id="${item.id}">Delete</button>
        </td>
      </tr>
    `
      )
      .join("");

    tableBody.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const listingsData = getListings();
        const listing = listingsData.find((entry) => entry.id === button.dataset.id);
        if (!listing) return;

        form.elements.id.value = listing.id;
        form.elements.title.value = listing.title;
        form.elements.priceLakhs.value = listing.priceLakhs;
        form.elements.location.value = listing.location;
        form.elements.type.value = listing.type;
        form.elements.amenities.value = listing.amenities.join(", ");
        form.elements.description.value = listing.description;
        form.elements.images.value = listing.images.join(", ");
        form.elements.mapEmbed.value = listing.mapEmbed;
      });
    });

    tableBody.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const updated = getListings().filter((entry) => entry.id !== button.dataset.id);
        saveListings(updated);
        renderTable();
      });
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const listingData = {
      id: String(formData.get("id") || "").trim() || Date.now().toString(),
      title: String(formData.get("title") || "").trim(),
      priceLakhs: Number(formData.get("priceLakhs") || 0),
      location: String(formData.get("location") || "").trim(),
      type: String(formData.get("type") || "Apartment").trim(),
      amenities: String(formData.get("amenities") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      description: String(formData.get("description") || "").trim(),
      images: String(formData.get("images") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      mapEmbed: String(formData.get("mapEmbed") || "").trim()
    };

    if (!listingData.images.length) return;

    const listings = getListings();
    const index = listings.findIndex((entry) => entry.id === listingData.id);
    if (index >= 0) {
      listings[index] = listingData;
    } else {
      listings.push(listingData);
    }

    saveListings(listings);
    resetAdminForm(form);
    renderTable();
  });

  resetBtn?.addEventListener("click", () => resetAdminForm(form));
  renderTable();
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function init() {
  setYear();
  setupMenu();
  markActiveNav();
  renderFeatured();
  renderListingsPage();
  renderPropertyDetails();
  setupLeadForms();
  setupAdminPage();
}

document.addEventListener("DOMContentLoaded", init);
