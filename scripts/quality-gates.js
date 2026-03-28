const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const failures = [];

function readFile(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function fail(message) {
  failures.push(message);
}

function isExternalPath(filePath) {
  return /^(https?:|mailto:|#|data:)/i.test(filePath);
}

function collectMatches(content, pattern, valueIndex) {
  return Array.from(content.matchAll(pattern)).map(function (match) {
    return match[valueIndex];
  });
}

function validateIndexHtml() {
  const indexHtml = readFile("index.html");
  const bannedTokens = ["your@email.com", "VIDEO_ID"];

  bannedTokens.forEach(function (token) {
    if (indexHtml.includes(token)) {
      fail('index.html містить placeholder: "' + token + '"');
    }
  });

  const htmlComments = indexHtml.match(/<!--[\s\S]*?-->/g);
  if (htmlComments && htmlComments.length) {
    fail("index.html містить HTML-коментарі; для production-версії вони мають бути прибрані");
  }

  const assetPaths = collectMatches(indexHtml, /(?:src|href)="([^"]+)"/g, 1);
  assetPaths.forEach(function (assetPath) {
    if (isExternalPath(assetPath)) return;

    const fullPath = path.join(rootDir, assetPath.split("?")[0]);
    if (!fs.existsSync(fullPath)) {
      fail('Не знайдено локальний ресурс з index.html: "' + assetPath + '"');
    }
  });
}

function loadPortfolioData() {
  const sandbox = { window: {} };
  vm.runInNewContext(readFile(path.join("scripts", "data.js")), sandbox);
  return sandbox.window.PORTFOLIO_DATA || {};
}

function validatePortfolioData() {
  const data = loadPortfolioData();
  const requiredCaseFields = [
    "id",
    "title",
    "client",
    "platform",
    "goal",
    "context",
    "approach",
    "result",
    "images",
    "stats"
  ];

  if (!Array.isArray(data.cases) || !data.cases.length) {
    fail("У scripts/data.js відсутні кейси");
    return;
  }

  data.cases.forEach(function (item, index) {
    requiredCaseFields.forEach(function (field) {
      const value = item[field];
      const isMissing = Array.isArray(value) ? value.length === 0 : !value;
      if (isMissing) {
        fail("Кейс #" + (index + 1) + ' не містить обов\'язкового поля "' + field + '"');
      }
    });

    ["goal", "context", "approach", "result"].forEach(function (field) {
      if (typeof item[field] === "string" && item[field].trim().length < 40) {
        fail("Кейс #" + (index + 1) + ' має занадто коротке поле "' + field + '"');
      }
    });

    if (Array.isArray(item.stats) && item.stats.length < 3) {
      fail("Кейс #" + (index + 1) + " має містити щонайменше 3 метрики");
    }

    if (Array.isArray(item.images)) {
      item.images.forEach(function (image, imageIndex) {
        if (!image.src) {
          fail("Кейс #" + (index + 1) + ", image #" + (imageIndex + 1) + " не містить src");
          return;
        }

        const fullPath = path.join(rootDir, image.src);
        if (!fs.existsSync(fullPath)) {
          fail("Кейс #" + (index + 1) + ' посилається на відсутнє зображення: "' + image.src + '"');
        }
      });
    }
  });

  ["videos", "gallery"].forEach(function (sectionName) {
    const items = data[sectionName];
    if (!Array.isArray(items) || !items.length) {
      fail("У scripts/data.js секція " + sectionName + " порожня");
      return;
    }

    items.forEach(function (item, index) {
      if (item.src && !isExternalPath(item.src)) {
        const fullPath = path.join(rootDir, item.src);
        if (!fs.existsSync(fullPath)) {
          fail(sectionName + " #" + (index + 1) + ' посилається на відсутній локальний ресурс: "' + item.src + '"');
        }
      }
    });
  });
}

validateIndexHtml();
validatePortfolioData();

if (failures.length) {
  console.error("Quality gates failed:\n");
  failures.forEach(function (message) {
    console.error("- " + message);
  });
  process.exit(1);
}

console.log("Quality gates passed.");