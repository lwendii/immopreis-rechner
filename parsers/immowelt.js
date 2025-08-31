export default {
  getListings: () =>
    document.querySelectorAll(
      '[data-testid="cardmfe-description-box-text-test-id"]'
    ),

  extractData: (listing, parseNumber) => {
    // Preis
    const priceEl = listing.querySelector(
      '[data-testid="cardmfe-price-testid"]'
    );
    const priceText = priceEl?.textContent || "";
    const price = parseNumber(priceText);

    // Fläche: wir suchen die "68,3 m²" aus der Keyfacts-Leiste
    const keyFacts = listing.querySelector(
      '[data-testid="cardmfe-keyfacts-testid"]'
    );
    if (!keyFacts) return null;

    const factItems = keyFacts.querySelectorAll(".css-9u48bm");
    let area = null;

    factItems.forEach((item) => {
      const text = item.textContent;
      if (text.includes("m²")) {
        area = parseNumber(text);
      }
    });

    if (!price || !area) return null;

    // Ziel zum Anhängen: direkt unter den Preisbereich
    const target = priceEl?.parentElement;

    return { price, area, target };
  },
};
