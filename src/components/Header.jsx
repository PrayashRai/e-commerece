import React, { useEffect, useRef, useState } from "react";
import { ImMenu3 } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLogout, CiHeart, CiLogin } from "react-icons/ci";
import { MdOutlineHistory } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const numberCart = useSelector((state) => state.cart.numberCart);

  const dropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoginStatus(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogoutHandler = () => {
    localStorage.clear();
    setLoginStatus(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
    setShowAccountDropdown(false); // Close account dropdown if open
  };

  const toggleAccountDropdown = () => {
    setShowAccountDropdown((prevState) => !prevState);
    setShowDropdown(false); // Close menu dropdown if open
  };

  return (
    <>
      <div className="header">
        <h1>
          <Link to="/">
            <span style={{ color: "#229799" }}>SHOP</span>
            <span style={{ color: "black" }}>LANE</span>
          </Link>
        </h1>

        <div className="icon-container">
          {loginStatus ? (
            <div className="menu-icon-wrapper" ref={dropdownRef}>
              <ImMenu3 className="menu-icon" onClick={toggleDropdown} />
              {showDropdown && (
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/wishlist">
                    <CiHeart className="dropdown-icon" />
                    Wish List
                  </Link>
                  <Link className="dropdown-item" to="/order-history">
                    <MdOutlineHistory className="dropdown-icon" />
                    Orders
                  </Link>
                  <button className="dropdown-item logout-item" onClick={onLogoutHandler}>
                    <CiLogout className="dropdown-icon logout-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="account-wrapper" ref={accountDropdownRef}>
              <MdOutlineAccountCircle
                className="account-icon"
                onClick={toggleAccountDropdown}
              />
              <Link onClick={toggleAccountDropdown}>
                <span style={{ fontWeight: "bold" }}>Login </span>
                <br />
                <span> or Sign Up</span>
              </Link>
              {showAccountDropdown && (
                <div className="dropdown-menu show">
                  <Link className="dropdown-item" to="/login">
                    <CiLogin className="dropdown-icon" />
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/signup">
                    <SiGnuprivacyguard className="dropdown-icon" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="cart-icon-wrapper">
            <FaCartShopping
              className="cart-icon"
              onClick={() => navigate("/cart")}
            />
            {numberCart > 0 && (
              <span className="cart-badge">{numberCart}</span>
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
