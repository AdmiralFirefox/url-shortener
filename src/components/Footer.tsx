import styles from "../styles/footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-image-wrapper"]}>
        <img src="/logo.svg" alt="Web Logo" />
      </div>
      <div className={styles["footer-links-wrapper"]}>
        <section>
          <h1>Features</h1>
          <a href="/">Link Shortening</a>
          <a href="/">Branded Links</a>
          <a href="/">Analytics</a>
        </section>
        <section>
          <h1>Resources</h1>
          <a href="/">Blog</a>
          <a href="/">Developers</a>
          <a href="/">Support</a>
        </section>
        <section>
          <h1>Company</h1>
          <a href="/">About</a>
          <a href="/">Our Team</a>
          <a href="/">Careers</a>
          <a href="/">Contact</a>
        </section>
      </div>
      <div className={styles["footer-social-links"]}>
        <a href="/">
          <i className="fa-brands fa-square-facebook"></i>
        </a>
        <a href="/">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="/">
          <i className="fa-brands fa-pinterest"></i>
        </a>
        <a href="/">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
