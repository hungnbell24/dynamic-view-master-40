import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import './index.css'
// Component React cần nhúng


// Định nghĩa Web Component
class ReactElement extends HTMLElement {
    connectedCallback() {
        const root = ReactDOM.createRoot(this);
        root.render(<App />);
    }
}

// Đăng ký Web Component
customElements.define("omron-react-web-component", ReactElement);
