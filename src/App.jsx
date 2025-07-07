import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import AppRouter from './Compunents/AppRouter';
import './App.css';

// יצירת ערכת נושא מותאמת אישית של Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#a5b4fc',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f093fb',
      light: '#f8b5ff',
      dark: '#e879f9',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

/* 
 * SUMMARY: App.jsx
 * תיאור: קומפוננטת App הראשית של האפליקציה
 * מה הקובץ עושה:
 * - יוצר ערכת נושא מותאמת אישית עם צבעים מודרניים
 * - מגדיר עיצוב גלובלי לכפתורים, כרטיסים ושדות
 * - עוטף את האפליקציה ב-Redux Provider
 * - מחבר את Material-UI Theme Provider
 * - מעלה את AppRouter לניהול ניתוב
 * סטטוס: ✅ תקין - אין שגיאות
 */
