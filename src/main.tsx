import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { ThemeProvider } from './Components/ThemeProvider';
import { BrowserRouter as Router } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <Router>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </Router>
    </Provider>
  </StrictMode>,
)
