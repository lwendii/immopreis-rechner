function parseNumber(text) {
  // "350.000 €" → 350000
  return parseFloat(
    text
      .replace(/\./g, "") // Tausenderpunkte entfernen
      .replace(",", ".") // Kommas durch Punkte ersetzen
      .match(/\d+(\.\d+)?/) // erste Zahl finden
  );
}

export function processListings(parser, thresholdsData) {
  function addQmPrices() {
    const listings = parser.getListings();
    listings.forEach((listing) => {
      if (listing.querySelector(".qm-preis-tag")) return;

      const data = parser.extractData(listing, parseNumber);
      if (!data || !data.price || !data.area || !data.target) return;

      const pricePerSqm = data.price / data.area;
      const priceFormatted = `${pricePerSqm.toFixed(2)} €/m²`;

      const thresholds = thresholdsData?.priceThresholds?.length
        ? thresholdsData.priceThresholds
        : [
            { max: 8, color: "#007f00" },
            { max: 10, color: "#ffcc00" },
            { max: 100000, color: "#ff0000" },
          ];

      const qmElement = document.createElement("div");
      qmElement.className = "qm-preis-tag";
      qmElement.textContent = priceFormatted;
      qmElement.style.fontWeight = "bold";
      qmElement.style.marginTop = "4px";

      const threshold = thresholds.find((t) => pricePerSqm <= t.max);
      qmElement.style.color = threshold?.color || "#000";

      const newLine = document.createElement("div");
      newLine.style.marginTop = "4px";
      newLine.appendChild(qmElement);

      data.target.appendChild(newLine);
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
