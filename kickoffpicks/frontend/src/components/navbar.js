import "../stiles/navbar.css";
import logo from "../images/logo.jpg";

const Navbar = () => {
  return (
    <div class="navbar">
      <div class="logo"></div>
      <div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Rooms</a>
          </li>
          <li>
            <a href="#">Competitions</a>
          </li>
          <li>
            <a href="signin">Log in</a>
          </li>
          <li>
            <a href="signup">Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function NavbarExport() {
  return <Navbar />;
}
