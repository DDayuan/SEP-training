import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import WishList from './components/WishlistPage/wishListPage';
import SearchPage from './components/SearchPage/searchPage';


const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path='/wishlist' element={<WishList />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
