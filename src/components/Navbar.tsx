import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import styles from "../styles/navbar/Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((isNavOpen) => !isNavOpen);
  };

  return (
    <>
      <header className={styles["navbar-wrapper"]}>
        <nav>
          <img src="/logo.svg" alt="Web Logo" />
          <a href="/">Features</a>
          <a href="/">Pricing</a>
          <a href="/">Resources</a>
        </nav>

        <nav>
          <a href="/">Login</a>
          <button>Sign Up</button>
          <div className={styles["hamburger-icon-wrapper"]}>
            <Hamburger
              size={42}
              toggled={isOpen}
              toggle={toggleNav}
              color="hsl(257, 7%, 63%)"
            />
          </div>
        </nav>
      </header>

      <header className={styles["navbar-mobile-wrapper"]}>
        <div
          className={
            isOpen ? styles["navbar-mobile-active"] : styles["navbar-mobile"]
          }
        >
          <a href="/">Features</a>
          <a href="/">Pricing</a>
          <a href="/">Resources</a>
          <div className={styles["navbar-mobile-divider"]} />
          <a href="/">Login</a>
          <button>Sign Up</button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
