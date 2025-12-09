function Header() {
  return (
    <nav class="navbar navbar-expand-md navbar-custom navbar-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav nav-custom mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about-us">
              About Us
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/events">
              Events
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact-us">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
