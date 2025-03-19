import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styles from "./index.css?inline"; // Load CSS dưới dạng chuỗi

class ReactElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Inject CSS vào Shadow DOM
        const styleTag = document.createElement("style");
        styleTag.textContent = styles;
        this.shadowRoot.appendChild(styleTag);
    }

    connectedCallback() {
        const mountPoint = document.createElement("div");
        this.shadowRoot.appendChild(mountPoint);
        const root = ReactDOM.createRoot(mountPoint);
        root.render(<App />);
    }
}

// Đăng ký Web Component
customElements.define("omron-react-web-component", ReactElement);
