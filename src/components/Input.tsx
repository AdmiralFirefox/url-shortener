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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !urlLink.includes("http://") &&
      !urlLink.includes("https://") &&
      urlLink !== ""
    ) {
      setErrorMessage("Please enter a valid url.");
      setError(true);
    } else {
      setError(false);
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
        setErrorMessage("Something went wrong. Please double check your url.");
        setError(true);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlLink(e.target.value);
  };

  const deleteLink = (id: string) => {
    const updatedLinks = [...links].filter((link) => link.id != id);

    setLinks(updatedLinks);
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
          <div
            className={
              error ? styles["input-form-error-active"] : styles["input-form"]
            }
          >
            <input
              type="text"
              placeholder="Shorten a link here..."
              onChange={handleChange}
              value={urlLink}
              required
            />
            {error ? <p>{errorMessage}</p> : ""}
          </div>
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
              <button onClick={() => deleteLink(link.id)}>
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
