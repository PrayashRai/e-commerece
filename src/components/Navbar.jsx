import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCategory(category); // Update the category in the parent component (if needed)
    navigate(`/home/${category}`); // Navigate to the ProductList page with the selected category
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="nav">
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ cursor: "pointer", border: 'none', background: 'none' }}
                  onClick={() => handleCategoryClick("")}
                >
                  All
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ cursor: "pointer", border: 'none', background: 'none' }}
                  onClick={() => handleCategoryClick("electronics")}
                >
                  Electronics
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ cursor: "pointer", border: 'none', background: 'none' }}
                  onClick={() => handleCategoryClick("jewelery")}
                >
                  Jewelery
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ cursor: "pointer", border: 'none', background: 'none' }}
                  onClick={() => handleCategoryClick("men's clothing")}
                >
                  Men's Clothing
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={{ cursor: "pointer", border: 'none', background: 'none' }}
                  onClick={() => handleCategoryClick("women's clothing")}
                >
                  Women's Clothing
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
