const fs = require("fs");
const path = require("path");
const translate = require("@iamtraction/google-translate");

const sourceLang = "no";
const targetLangs = ["en", "de"];
const sourcePath = path.join(__dirname, "public", "locales", sourceLang, "translation.json");
const sourceData = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

(async () => {
  for (const lang of targetLangs) {
    const translated = {};

    for (const key in sourceData) {
      try {
        const res = await translate(sourceData[key], { from: sourceLang, to: lang });
        translated[key] = res.text;
      } catch (err) {
        console.error(`❌ Feil under oversettelse av "${key}":`, err.message);
      }
    }

    const targetDir = path.join(__dirname, "public", "locales", lang);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, "translation.json");
    fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2), "utf8");

    console.log(`✅ Oversatt til ${lang} og lagret i ${targetPath}`);
  }
})();
