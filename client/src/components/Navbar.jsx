function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🍕 Foodie
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Restaurants</a>
        <a href="#cart">🛒 Cart</a>
        <a href="#">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;