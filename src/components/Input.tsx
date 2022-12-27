import { ChangeEvent, useState, useEffect } from "react";
import type { FormEvent } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import styles from "../styles/input/Input.module.scss";

interface LinkProps {
  id: string;
  shortLink: string;
  originalLink: string;
}

const Input = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [urlLink, setUrlLink] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await Axios.get(
        `https://api.shrtco.de/v2/shorten?url=${urlLink}`
      );

      const newLink = {
        id: uuidv4(),
        shortLink: res.data.result.short_link,
        originalLink: urlLink,
      };

      setLinks([...links].concat(newLink));
      setUrlLink("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlLink(e.target.value);
  };

  useEffect(() => {
    const json = localStorage.getItem("LINKS") as string;
    const saveLinks = JSON.parse(json);

    if (saveLinks) {
      setLinks(saveLinks);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(links);
    localStorage.setItem("LINKS", json);
  }, [links]);

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <form className={styles["input-content"]} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Shorten a link here..."
            onChange={handleChange}
            value={urlLink}
          />
          <button type="submit">Shorten It!</button>
        </form>
      </div>

      <ul className={styles["links-wrapper"]}>
        {links.map((link) => (
          <li key={link.id} className={styles["links-content"]}>
            <div>
              <p>{link.originalLink}</p>
            </div>
            <div>
              <p>{link.shortLink}</p>
              <button>Copy</button>
              <button>
                <IconContext.Provider
                  value={{ className: styles["close-icon"] }}
                >
                  <IoMdCloseCircle />
                </IconContext.Provider>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Input;
