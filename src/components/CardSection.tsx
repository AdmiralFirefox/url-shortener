import cardData from "../data/card_data.json";
import styles from "../styles/cardsection/CardSection.module.scss";

const CardSection = () => {
  return (
    <div className={styles["cards-wrapper"]}>
      <div className={styles["cards-container"]}>
        {cardData.map((data) => (
          <section key={data.id}>
            <div className={styles["card-image-wrapper"]}>
              <img src={data.imgPath} alt={data.cardTitle} />
            </div>
            <h1>{data.cardTitle}</h1>
            <p>{data.cardDescription}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
