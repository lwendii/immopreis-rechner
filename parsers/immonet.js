export default {
  getListings: () =>
    Array.from(
      document.querySelectorAll(
        '[data-testid="cardmfe-description-box-text-test-id"]'
      )
    ),

  extractData: (listingEl, parseNumber) => {
    // Preis extrahieren
    const priceEl = listingEl.querySelector(
      '[data-testid="cardmfe-price-testid"]'
    );
    const priceText = priceEl?.textContent || "";
    const price = parseNumber(priceText);

    // Fläche extrahieren
    const keyfacts = listingEl.querySelector(
      '[data-testid="cardmfe-keyfacts-testid"]'
    );
    let area = null;

    if (keyfacts) {
      const parts = Array.from(keyfacts.querySelectorAll("div"))
        .map((el) => el.textContent.trim())
        .filter(Boolean);

      const areaText = parts.find((text) => text.includes("m²"));
      area = parseNumber(areaText);
    }

    if (!price || !area) return null;

    const target = priceEl?.parentElement;

    return { price, area, target };
  },
};
