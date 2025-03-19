import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RENDER_DIV_ID } from './RenderConfig.ts';

createRoot(document.getElementById(RENDER_DIV_ID)!).render(<App />);