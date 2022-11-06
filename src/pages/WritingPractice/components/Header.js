import React from "react";
import "../header.css"
function Header({backFunction, title , typeFunck}) {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-btn" onClick={() => backFunction(typeFunck)}>
          <span className="header-label-btn">
            <svg viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
            </svg>
          </span>
        </div>
        <h6 className="header-title-h6">{title}</h6>
        <div className="header-points">
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
          7
        </div>
      </div>
    </header>
  );
}

export default Header;
