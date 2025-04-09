import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Material Icons stylesheet
const materialIconsLink = document.createElement("link");
materialIconsLink.href = "https://cdn.jsdelivr.net/npm/material-icons@1.13.8/iconfont/material-icons.min.css";
materialIconsLink.rel = "stylesheet";
document.head.appendChild(materialIconsLink);

// Add Inter font
const interFontLink = document.createElement("link");
interFontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
interFontLink.rel = "stylesheet";
document.head.appendChild(interFontLink);

// Add meta title
const metaTitle = document.createElement("title");
metaTitle.textContent = "AllInOne - Complete Marketing Platform";
document.head.appendChild(metaTitle);

createRoot(document.getElementById("root")!).render(<App />);
