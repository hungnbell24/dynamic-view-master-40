import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styles from "./index.css?inline"; // Load CSS dưới dạng chuỗi

import { RENDER_COMPONENT_TAG_NAME, RENDER_DIV_ID } from "./RenderConfig.ts";


// Tạo một class Web Component
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
        mountPoint.id = RENDER_DIV_ID;
        this.shadowRoot.appendChild(mountPoint);
        const root = ReactDOM.createRoot(mountPoint);
        root.render(<App />);
    }
}

// Đăng ký Web Component
customElements.define(RENDER_COMPONENT_TAG_NAME, ReactElement);
