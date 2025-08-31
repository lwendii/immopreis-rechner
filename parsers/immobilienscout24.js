export default {
  getListings: () => document.querySelectorAll('[data-testid="attributes"]'),

  extractData: (listing, parseNumber) => {
    const ddElements = listing.querySelectorAll("dd");
    if (ddElements.length < 2) return null;

    const price = parseNumber(ddElements[0].textContent);
    const area = parseNumber(ddElements[1].textContent);
    const target = listing.querySelector(".grid-item.font-ellipsis");

    return { price, area, target };
  },
};
