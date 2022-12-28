import styles from "../styles/statistics/Statistics.module.scss";

const Statistics = () => {
  return (
    <div className={styles["statistics-wrapper"]}>
      <section className={styles["statistics-content"]}>
        <h1>Advanced Statistics</h1>
        <p>
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </section>
    </div>
  );
};

export default Statistics;
