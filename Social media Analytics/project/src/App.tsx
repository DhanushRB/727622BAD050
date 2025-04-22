import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <NavLink to="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
                My Social Media
              </NavLink>
              <nav>
                <ul className="flex space-x-8">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                          : "text-gray-500 hover:text-gray-900 font-medium"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                          : "text-gray-500 hover:text-gray-900 font-medium"
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-900 font-semibold border-b-2 border-gray-900 pb-1"
                          : "text-gray-500 hover:text-gray-900 font-medium"
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div className="text-center text-red-500">404 - Page Not Found</div>} />
          </Routes>
        </main>

        
        <footer className="bg-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center text-gray-500">
              <p>&copy; 2025 My Website. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
