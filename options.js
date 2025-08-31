const thresholdsContainer = document.getElementById("thresholds");
const addButton = document.getElementById("add");
const saveButton = document.getElementById("save");

// Hilfsfunktion: neue Zeile erzeugen
function createThresholdRow(value = "", color = "#007f00") {
  const row = document.createElement("div");
  row.className = "row";

  const inputValue = document.createElement("input");
  inputValue.type = "number";
  inputValue.min = "0";
  inputValue.step = "0.01";
  inputValue.placeholder = "€/m²";
  inputValue.value = value;

  const inputColor = document.createElement("input");
  inputColor.type = "color";
  inputColor.value = color;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "🗑️";
  removeBtn.onclick = () => row.remove();

  row.append(inputValue, inputColor, removeBtn);
  thresholdsContainer.appendChild(row);
}

// Vorhandene Daten laden
chrome.storage.sync.get("priceThresholds", (data) => {
  const thresholds = data.priceThresholds || [
    { max: 8, color: "#007f00" }, // grün
    { max: 10, color: "#ffcc00" }, // gelb
    { max: 100000, color: "#ff0000" }, // rot für alles darüber
  ];

  thresholds.forEach(({ max, color }) => createThresholdRow(max, color));
});

// Hinzufügen-Button
addButton.onclick = () => createThresholdRow();

// Speichern
saveButton.onclick = () => {
  const rows = thresholdsContainer.querySelectorAll(".row");
  const data = [];

  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input");
    const max = parseFloat(inputs[0].value);
    const color = inputs[1].value;

    if (!isNaN(max)) {
      data.push({ max, color });
    }
  });

  // Nach Schwellenwert sortieren (aufsteigend)
  data.sort((a, b) => a.max - b.max);

  chrome.storage.sync.set({ priceThresholds: data }, () => {
    console.log("Gespeichert:", data); // ✅ ← HIER

    alert(
      "Einstellungen gespeichert. Bitte die Immobilienseite neu laden, um die Änderungen zu sehen."
    );
  });
};
