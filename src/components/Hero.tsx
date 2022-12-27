import styles from "../styles/hero/Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles["hero-wrapper"]}>
      <section>
        <h1>More than just shorter links</h1>
        <p>
          Build your brand's recognition and get detailed insights on how your
          links are performing.
        </p>
        <form>
          <button formAction="/">Get Started</button>
        </form>
      </section>
      <div className={styles["hero-image-wrapper"]}>
        <img src="/illustration-working.svg" alt="Working Logo" />
      </div>
    </div>
  );
};

export default Hero;
