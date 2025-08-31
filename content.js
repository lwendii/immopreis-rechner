// 1. Gesamtpreis und die Wohnfläche finden
// 2. Den Quadratmeterpreis berechnen
// 3. Das Ergebnis auf der Seite einfügen

function parseNumber(text) {
  // "350.000 €" → 350000
  return parseFloat(
    text
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.]/g, "")
  );
}

function addQmPriceToListings() {
  const listings = document.querySelectorAll('[data-testid="attributes"]');

  listings.forEach((listing) => {
    const ddElements = listing.querySelectorAll("dd");
    if (ddElements.length < 2) return;

    const priceText = ddElements[0].textContent.trim(); // z. B. "1.150 €"
    const areaText = ddElements[1].textContent.trim(); // z. B. "99,4 m²"

    const price = parseNumber(priceText);
    const area = parseNumber(areaText);

    if (!price || !area) return;

    const pricePerSqm = price / area;
    const priceFormatted = `${pricePerSqm
      .toFixed(2)
      .toLocaleString("de-DE")} €/m²`;

    // Nur hinzufügen, wenn noch nicht vorhanden
    if (listing.querySelector(".qm-preis-tag")) return;

    const qmElement = document.createElement("div");
    qmElement.textContent = priceFormatted;
    qmElement.className = "qm-preis-tag";
    qmElement.style.color = "#007F00";
    qmElement.style.fontWeight = "bold";
    qmElement.style.marginTop = "4px";

    // Einfügen unter dem bestehenden Preis/Wohnfläche
    listing.querySelector(".grid-item.font-ellipsis")?.appendChild(qmElement);
  });
}

// Falls es sich um eine dynamisch ladende Seite handelt:
const observer = new MutationObserver(() => {
  addQmPriceToListings();
});

// Starte das Script, wenn Seite geladen ist
window.addEventListener("load", () => {
  addQmPriceToListings();

  // Beobachte Veränderungen im DOM (für dynamisch geladene Listings)
  observer.observe(document.body, { childList: true, subtree: true });
});
