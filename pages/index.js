import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(false);

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
  const alt = images[choice].replace(/.+ -(.+)\.png/, "$1");

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameInput, type: typeInput }),
    });
    const data = await response.json();
    const lines = data.result.trim().split("\n");
    console.log("poemLines ", lines);
    setPoem(lines);
    setNameInput("");
  }

  const renderPoem = () => {
    return (
      <>
      <h3>Your {typeInput}</h3>
      <div className={styles.poem}>
        {poem.map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
      </div>
      </>
    );
  };

  const renderForm = () => {
    return (
      <>
        <h2>Make a Christmas limerick* or poem </h2>
        {loading == false ? (
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your first name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <fieldset className={styles.fieldset}>
              <legend>Choose limerick or poem</legend>
              <div aria-hidden="true" className={styles.legend}>
                Choose limerick or poem
              </div>
              <div>
                <input
                  type="radio"
                  id="limerick"
                  name="type"
                  value="limerick"
                  onChange={(e) => setTypeInput(e.target.value)}
                  checked={typeInput === "limerick"}
                />
                <label htmlFor="limerick">Limerick</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="poem"
                  name="type"
                  value="poem"
                  onChange={(e) => setTypeInput(e.target.value)}
                  checked={typeInput === "poem"}
                />
                <label htmlFor="poem">Poem</label>
              </div>
            </fieldset>
            <input
              type="submit"
              value="Generate it..."
              disabled={nameInput === "" || typeInput === ""}
            />
          </form>
        ) : (
          <p className={styles.loading}>Generating...</p>
        )}
      </>
    );
  };

  return (
    <div>
      <Head>
        <title>Mairry Christmas</title>
      </Head>

      <main className={styles.main}>
        <h1>Merry Christmas from Glen and our new robot overlords</h1>
        <div className={styles.layout}>
          <figure className={styles.layout_left}>
            <img className={styles.card} src={`/images/${image}`} alt="Christmas card image generated by DALL-E 2, an AI" />
            <figcaption className={styles.card_caption}>{alt}</figcaption>
          </figure>
          <div className={styles.layout_right}>
            {poem ? renderPoem() : renderForm()}
            <div className={styles.blurb}>
              <p>
                *Sometimes it will generate a rude poem/limerick and it's not the
                best at rhyming! Apologies from me.
              </p>
              <p>
                The Christmas card you see is created by{" "}
                <a href="https://openai.com/dall-e-2/">DALL-E 2</a> an{" "}
                <abbr>AI</abbr> (Artificial Intelligence) model that creates
                images from prompts. I used prompts like{" "}
                <em>
                  'A Christmas scene set in Cornwall in the style of Pieter
                  Bruegel'
                </em>{" "}
                to make them.
              </p>
              <p>
                The limerick is generated by{" "}
                <a href="https://openai.com/blog/chatgpt/">ChatGPT</a>, another{" "}
                <abbr>AI</abbr> (Artificial Intelligence) model which generates
                all sorts of text. This was done with{" "}
                <em>'Make a Christmas limerick about someone called ...'</em>
              </p>
              <p>
                The poem is done with{" "}
                <em>'Write a short Christmas poem featuring ...'</em>
              </p>
              <p className={styles.smaller_text}>
                <a href="https://github.com/glenpike/christmas-2022">Made</a> by{" "}
                Glen Pike with help from{" "}
                <a href="https://beta.openai.com/docs/quickstart/build-your-application">
                  OpenAI
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
