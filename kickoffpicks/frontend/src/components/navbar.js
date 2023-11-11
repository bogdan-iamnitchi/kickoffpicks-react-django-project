import "../stiles/navbar.css";

const Navbar = () => {
  return (
    <div class="navbar">
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Teams</a>
        </li>
        <li>
          <a href="#">Competitions</a>
        </li>
      </ul>
    </div>
  );
};

export default function NavbarExport() {
  return <Navbar />;
}
