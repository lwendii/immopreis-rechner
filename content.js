import { parsers } from "./parsers/index.js";
import { processListings } from "./core/processListings.js";

// Dispatcher
(function () {
  const host = window.location.hostname;

  const parserKey = Object.keys(parsers).find((domain) =>
    host.includes(domain)
  );

  if (parserKey) {
    processListings(parsers[parserKey]);
  } else {
    console.log("Keine unterstützte Plattform:", host);
  }
})();
