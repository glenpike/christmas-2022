import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [poem, setPoem] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const images = [
    "DALL·E 2022-12-14 11.52.34 - A Christmas scene set in Cornwall in the style of Pieter Bruegel.png",
    "DALL·E 2022-12-14 11.52.36 - A Christmas scene set in Cornwall in the style of Pieter Bruegel.png",
    "DALL·E 2022-12-14 11.52.39 - A Christmas scene set in Cornwall in the style of Pieter Bruegel.png",
    "DALL·E 2022-12-14 11.52.42 - A Christmas scene set in Cornwall in the style of Pieter Bruegel.png",
    "DALL·E 2022-12-14 11.54.12 - A Christmas scene set in Cornwall in the style of Tim Burton's Nightmare Before Christmas.png",
    "DALL·E 2022-12-14 11.54.15 - A Christmas scene set in Cornwall in the style of Tim Burton's Nightmare Before Christmas.png",
    "DALL·E 2022-12-14 11.54.17 - A Christmas scene set in Cornwall in the style of Tim Burton's Nightmare Before Christmas.png",
    "DALL·E 2022-12-14 11.54.20 - A Christmas scene set in Cornwall in the style of Tim Burton's Nightmare Before Christmas.png",
    "DALL·E 2022-12-14 11.55.10 - A Christmas scene set in Cornwall in the style of Star Wars.png",
    "DALL·E 2022-12-14 11.55.12 - A Christmas scene set in Cornwall in the style of Star Wars.png",
    "DALL·E 2022-12-14 11.55.15 - A Christmas scene set in Cornwall in the style of Star Wars.png",
    "DALL·E 2022-12-14 11.55.18 - A Christmas scene set in Cornwall in the style of Star Wars.png",
    "DALL·E 2022-12-14 11.58.24 - A Christmas scene in the style of Disney animated films featuring a Disney Princess in a department store.png",
    "DALL·E 2022-12-14 11.58.30 - A Christmas scene in the style of Disney animated films featuring a Disney Princess in a department store.png",
    "DALL·E 2022-12-14 11.58.33 - A Christmas scene in the style of Disney animated films featuring a Disney Princess in a department store.png",
    "DALL·E 2022-12-14 11.58.35 - A Christmas scene in the style of Disney animated films featuring a Disney Princess in a department store.png",
    "DALL·E 2022-12-14 11.59.18 - A Christmas scene in the style of Hieronymus Bosch.png",
    "DALL·E 2022-12-14 11.59.22 - A Christmas scene in the style of Hieronymus Bosch.png",
    "DALL·E 2022-12-14 11.59.24 - A Christmas scene in the style of Hieronymus Bosch.png",
    "DALL·E 2022-12-14 11.59.27 - A Christmas scene in the style of Hieronymus Bosch.png",
    "DALL·E 2022-12-14 12.07.07 - A snowy Christmas Scene from New York in the style of Vincent Van Gogh.png",
    "DALL·E 2022-12-14 12.07.09 - A snowy Christmas Scene from New York in the style of Vincent Van Gogh.png",
    "DALL·E 2022-12-14 12.07.11 - A snowy Christmas Scene from New York in the style of Vincent Van Gogh.png",
    "DALL·E 2022-12-14 12.07.13 - A snowy Christmas Scene from New York in the style of Vincent Van Gogh.png",
    "DALL·E 2022-12-14 12.07.57 - A snowy Christmas Scene with Santa Claus set in Paris in the style of Vincent Van Gogh.png",
  ];
  const [choice] = useState(Math.floor(Math.random() * images.length));
  const image = images[choice];
  const alt = image.replace(/.+ -(.+)\.png/, "$1");

  async function onSubmit(event) {
    event.preventDefault();
    setDisabled(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameInput }),
    });
    const data = await response.json();
    const lines = data.result.trim().split("\n");
    console.log("poemLines ", lines);
    setPoem(lines);
    setNameInput("");
  }

  const renderPoem = () => {
    return (
      <div className={styles.poem}>
        {poem.map((line) => {
          return (<p>{line}</p>)
        })}
      </div>
    );
  };

  const renderForm = () => {
    return (
      <>
        <h3>Make a christmas poem for me</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your first name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input type="submit" value="Generate a poem" disabled={disabled} />
        </form>
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>Merry Christmas</title>
      </Head>

      <main className={styles.main}>
        <img src={`/images/${image}`} alt={alt} />
        {poem ? renderPoem() : renderForm()}
      </main>
    </div>
  );
}
