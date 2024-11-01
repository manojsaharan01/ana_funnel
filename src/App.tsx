import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeForm from './pages/WelcomeForm';
import AssessmentTool from './pages/AssessmentTool';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-200">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<WelcomeForm setUserInfo={setUserInfo} />} 
            />
            <Route 
              path="/assessment" 
              element={
                userInfo.email ? 
                <AssessmentTool userInfo={userInfo} /> : 
                <Navigate to="/" replace />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;