import styles from "../styles/boost/Boost.module.scss";

const Boost = () => {
  return (
    <section className={styles["boost-wrapper"]}>
      <h1>Boost your links today</h1>
      <form>
        <button formAction="/">Get Started</button>
      </form>
    </section>
  );
};

export default Boost;
