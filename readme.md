# Immobilien Quadratmeterpreis Berechnung – Chrome Extension

Diese Chrome Extension berechnet den **Preis pro Quadratmeter** (€/m²) auf Immobilien-Webseiten und zeigt ihn direkt an. Zusätzlich können Benutzer dynamisch Preisgrenzen (mit Farben) über die **Options-Seite** der Extension anpassen.

## 🚀 Features

- **Berechnung des Quadratmeterpreises (€/m²)** für Immobilienanzeigen
- **Dynamische Konfiguration** der Preisgrenzen und Farben

  - Schwellenwerte können durch den Benutzer geändert werden (z. B. `8 €/m² = grün`, `10 €/m² = gelb`)
  - Die Farben werden für den Preisbereich angepasst

- Anpassung erfolgt über eine **Options-Seite**, die jederzeit geändert werden kann
- **Speichern der Einstellungen** durch `chrome.storage.sync`, damit sie über Browser-Sessions hinweg erhalten bleiben

## 🔧 Installation

1. Klone das Repository oder lade es herunter:

   ```bash
   git clone https://github.com/lwendii/immopreis-rechner.git
   ```

2. Gehe in das Projektverzeichnis:

   ```bash
   cd immopreis-rechner
   ```

3. Führe `node build.js` aus, um die Dateien zu bauen und in den `dist/`-Ordner zu kopieren:

   ```bash
   node build.js
   ```

4. Gehe zu `chrome://extensions/` in deinem Chrome-Browser.

5. Aktiviere den **Entwicklermodus** (rechts oben auf der Seite).

6. Klicke auf **"Entpackte Erweiterung laden"**.

7. Wähle den Ordner aus, der die Extension-Dateien enthält (`immopreis-rechner`).

8. Die Extension ist jetzt aktiv und sollte auf unterstützten Webseiten den Quadratmeterpreis berechnen und anzeigen!

## ⚙️ Optionen konfigurieren

1. Klicke auf das Extension-Icon in der Browser-Leiste.

2. Wähle die Option **"Optionen"**, um zur Konfigurationsseite zu gelangen.

3. Auf der Options-Seite kannst du folgende Werte anpassen:

   - **Preisgrenzen (€/m²)**: Definiere, bis zu welchem Quadratmeterpreis die Farbe grün, gelb, etc. verwendet wird.
   - **Farben**: Setze die Farben für die jeweiligen Schwellenwerte.

4. Deine Änderungen werden automatisch gespeichert und wirken sich auf alle unterstützten Seiten aus.

## 🌍 Unterstützte Webseiten

Diese Extension unterstützt aktuell die folgenden Immobilien-Webseiten:

- **Immobilienscout24** (immobilienscout24.de)
- **Immonet** (immonet.de)
- **Immowelt** (immowelt.de)

Weitere Seiten können bei Bedarf hinzugefügt werden.

Hinweis:
Die unterstützten Webseiten können sich ändern oder die HTML-Struktur der Seiten kann angepasst werden. Falls dies der Fall ist, könnte die Extension möglicherweise nicht mehr richtig funktionieren. In diesem Fall kann es erforderlich sein, den Parser für die jeweilige Seite anzupassen.

Weitere Seiten können bei Bedarf hinzugefügt werden.

---

## 🛠️ Technische Details

### 1. **Speicherung der Einstellungen**

Die benutzerdefinierten Einstellungen (Preisgrenzen und Farben) werden in **`chrome.storage.sync`** gespeichert, sodass sie auch über verschiedene Browsersitzungen hinweg erhalten bleiben.

### 2. **Dynamische Preisbereichskonfiguration**

Die **Options-Seite** ermöglicht es dem Benutzer, beliebig viele Preisgrenzen und Farben hinzuzufügen und zu speichern.

### 3. **Preisberechnung**

Der Quadratmeterpreis wird auf der Basis des **Kaufpreises** und der **Wohnfläche** der Immobilien berechnet und in der UI angezeigt.

---

## Attribution

Icon: [House icon](https://icons8.com/icon/JV9QvsUAUkOM/house) by [Icons8](https://icons8.com)
