function parseNumber(text) {
  // "350.000 €" → 350000
  return parseFloat(
    text
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, "")
  );
}

export function processListings(parser) {
  function addQmPrices() {
    const listings = parser.getListings();
    listings.forEach((listing) => {
      if (listing.querySelector(".qm-preis-tag")) return;

      const data = parser.extractData(listing, parseNumber);
      if (!data || !data.price || !data.area || !data.target) return;

      const pricePerSqm = data.price / data.area;
      const tag = document.createElement("div");
      tag.className = "qm-preis-tag";
      tag.textContent = `${pricePerSqm.toFixed(2)} €/m²`;
      tag.style.color = "#007F00";
      tag.style.fontWeight = "bold";
      tag.style.marginTop = "4px";

      data.target.appendChild(tag);
    });
  }

  // Falls es sich um eine dynamisch ladende Seite handelt:
  const observer = new MutationObserver(addQmPrices);

  // Starte das Script, wenn Seite geladen ist
  window.addEventListener("load", () => {
    addQmPrices();
    // Beobachte Veränderungen im DOM (für dynamisch geladene Listings)
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
