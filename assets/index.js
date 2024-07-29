import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

try {

    const root = createRoot(document.getElementById('root'));

    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} catch(e) {}