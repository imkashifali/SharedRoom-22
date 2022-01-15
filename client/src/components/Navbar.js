import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            SharedRoom
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              {user ? (
                <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <i class="far fa-user"></i> {user.name}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a class="dropdown-item" href="/profile">
                      <i class="fas fa-archway">Profile</i>
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={userLogout}>
                      <i class="fas fa-sign-out-alt">Logout</i> 
                      </a>
                    </li>
                  </ul>
                </div>
                
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <a class="nav-link active" href="/register">
                      Register
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
