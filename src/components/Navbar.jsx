import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#333",
    padding: "10px",
  },
  list: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  listItem: {
    margin: "0 15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;
