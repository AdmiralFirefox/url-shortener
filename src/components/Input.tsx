import { ChangeEvent, useState, useEffect } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import type { FormEvent } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SyncLoader from "react-spinners/SyncLoader";
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
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState<string | boolean>(false);

  const [_value, copy] = useCopyToClipboard();

  // Submitting a Link and Shortening It
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !urlLink.includes("http://") &&
      !urlLink.includes("https://") &&
      urlLink !== ""
    ) {
      setErrorMessage("Please enter a valid url.");
      setError(true);
      setLoading(false);
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
        setLoading(false);
      } catch (err) {
        console.log(err);
        setErrorMessage("Something went wrong. Please double check your url.");
        setError(true);
        setLoading(false);
      }
    }
  };

  // Truncate Long Url Link
  const truncateLink = (text: string, limit: number) => {
    if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
        if (
          text.charAt(i) === " " &&
          (text.charAt(i - 1) != "," ||
            text.charAt(i - 1) != "." ||
            text.charAt(i - 1) != ";")
        ) {
          return text.substring(0, i) + "...";
        }
      }
      return text.substring(0, limit) + "...";
    } else return text;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlLink(e.target.value);
  };

  // Delete a Link
  const deleteLink = (id: string) => {
    const updatedLinks = [...links].filter((link) => link.id != id);

    setLinks(updatedLinks);
  };

  // Clear all Links
  const clearAllLinks = () => {
    setLinks([]);
  };

  // Storing Links in Local Storage
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
              disabled={loading ? true : false}
            />
            {error ? <p>{errorMessage}</p> : ""}
            {loading ? (
              <div className={styles["loading-spinner-wrapper"]}>
                <SyncLoader color="hsl(180, 66%, 49%)" size={15} />
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" disabled={loading ? true : false}>
            Shorten It!
          </button>
        </form>
      </div>

      {links.length > 0 && (
        <div className={styles["clear-links-button"]}>
          <button onClick={clearAllLinks}>Clear All Links</button>
        </div>
      )}

      <ul className={styles["links-wrapper"]}>
        {links.map((link) => (
          <li key={link.id} className={styles["links-content"]}>
            <div>
              <p>{truncateLink(link.originalLink, 70)}</p>
            </div>
            <div>
              <p>{link.shortLink}</p>
              {isCopied === link.id ? (
                <button
                  onClick={() => copy(link.shortLink)}
                  className={styles["link-copied-button"]}
                >
                  Copied!
                </button>
              ) : (
                <button
                  onClick={() => {
                    copy(link.shortLink);
                    setIsCopied(link.id);
                  }}
                  className={styles["link-not-copied-button"]}
                >
                  Copy
                </button>
              )}
              <button
                onClick={() => deleteLink(link.id)}
                className={styles["close-button"]}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Input;
