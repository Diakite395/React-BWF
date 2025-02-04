import React from 'react';
import './App.css';
import Header from './components/layout/header';
import Main from './components/layout/main';
import Sidebar from './components/layout/sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';


function App() {

  const user = JSON.parse(localStorage.getItem("bwf-user"));
  // console.log("User " + user);

  return (
    <AuthProvider user={user}>
      <div className='App'>   
        <Router>
          <Header />
          <div className='content'>
            <Sidebar />
            <Main />
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
