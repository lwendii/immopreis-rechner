import { parsers } from "./parsers/index.js";
import { processListings } from "./core/processListings.js";

// Dispatcher
(function () {
  const host = window.location.hostname;

  const parserKey = Object.keys(parsers).find((domain) =>
    host.includes(domain)
  );

  if (parserKey) {
    if (chrome?.storage?.sync) {
      chrome.storage.sync.get("priceThresholds", (data) => {
        processListings(parsers[parserKey], data);
      });
    } else {
      console.log("chrome.storage.sync nicht verfügbar");
    }
  } else {
    console.log("Keine unterstützte Plattform:", host);
  }
})();
