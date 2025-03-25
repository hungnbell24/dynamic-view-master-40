
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styles from "./index.css?inline"; // Load CSS as a string
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ON_DATA_CHANGE_EVENT_NAME, RENDER_COMPONENT_TAG_NAME, RENDER_DIV_ID } from "./RenderConfig.ts";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import { AppPageComponentName } from "./lib/Interfaces.ts";

// Create a Web Component class
class ReactElement extends HTMLElement {
    private root: ReactDOM.Root | null = null;
    private _name: string = '';
    private _data: string = '{}';

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
    static get observedAttributes() {
        return ['name', 'data'];
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


    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'name':
                    this._name = newValue;
                    break;
                case 'data':
                    try {
                        this._data = JSON.parse(newValue);
                    } catch (e) {
                        this._data = newValue;
                    }
                    break;
            }
            this.renderApp();
        }
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
        this.root = ReactDOM.createRoot(mountPoint);
        this.renderApp();
    }

    renderApp() {
        if (!this.root) return;
        this.root.render(
            <ThemeProvider>
                <ToastProvider>
                    <App
                        initialName={this._name as AppPageComponentName}
                        initialData={this._data}
                        onDataChangeCallback={(newData) => {
                            // Dispatch custom event để gửi dữ liệu về Angular
                            const event = new CustomEvent(ON_DATA_CHANGE_EVENT_NAME, {
                                detail: newData,
                                bubbles: true
                            });
                            this.dispatchEvent(event);
                        }} />
                </ToastProvider>
            </ThemeProvider>
        );
    }

    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }
}

// Register the Web Component
customElements.define(RENDER_COMPONENT_TAG_NAME, ReactElement);
