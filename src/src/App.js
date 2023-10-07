import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';

import Login from './design/Login';
import Main from './design/Main';
function App() {
  useEffect(() => {
    document.title = 'Assessment'; 
  }, []);
  return (
    <Router>
      <div className="App">
        
      </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
    </Router>
  );
}

export default App;