
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styles from "./index.css?inline"; // Load CSS as a string
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { RENDER_COMPONENT_TAG_NAME, RENDER_DIV_ID } from "./RenderConfig.ts";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";

// Create a Web Component class
class ReactElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Create a style element
        const styleTag = document.createElement("style");

        // Process CSS to include all CSS variables from :root directly in the component
        const processedStyles = this.processStyles(styles);
        styleTag.textContent = processedStyles;

        // Append style to shadow DOM
        this.shadowRoot.appendChild(styleTag);
    }

    // Process CSS by extracting :root variables and making them available in the shadow DOM
    processStyles(cssText) {
        // Extract all CSS variable definitions from :root
        const rootRegex = /:root\s*{([^}]*)}/g;
        let rootMatch;
        let cssVariables = '';

        while ((rootMatch = rootRegex.exec(cssText)) !== null) {
            cssVariables += rootMatch[1];
        }

        // Create a new CSS string with variables directly in the component's scope
        const processedCss = cssText.replace(/:root\s*{[^}]*}/g, '');

        // Add CSS variables at the top level of the shadow DOM
        return `:host {${cssVariables}}\n${processedCss}`;
    }

    connectedCallback() {
        // Create a mounting point
        const mountPoint = document.createElement("div");
        mountPoint.id = RENDER_DIV_ID;
        this.shadowRoot.appendChild(mountPoint);

        // Set initial theme class based on localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            // this.classList.add('dark');
            this.shadowRoot.getElementById(RENDER_DIV_ID).classList.add('dark');
        }

        // Create React root and render app
        const root = ReactDOM.createRoot(mountPoint);
        root.render(
            <ThemeProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </ThemeProvider>
        );
    }
}

// Register the Web Component
customElements.define(RENDER_COMPONENT_TAG_NAME, ReactElement);
