import Head from "next/head";
import { useState } from "react";
import ClipboardJS from "clipboard";

const Home = () => {
  const [formData, setFormData] = useState({
    userInputAudience: "",
    userInputFormality: "",
    userInputDomain: "",
    userInputVolume: "",
    userInputLanguage: "",
    userInputSimple: "",
    userInputCompelling: "",
    userInputText: "",
    userInputCondition: "",
  });
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    console.log(
      `${formData.userInputAudience}${formData.userInputFormality}${formData.userInputDomain}`
    );
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInputAudience: formData.userInputAudience,
        userInputFormality: formData.userInputFormality,
        userInputDomain: formData.userInputDomain,
        userInputVolume: formData.userInputVolume,
        userInputLanguage: formData.userInputLanguage,
        userInputSimple: formData.userInputSimple,
        userInputCompelling: formData.userInputCompelling,
        userInputCondition: formData.userInputCondition,
        userInputText: formData.userInputText,
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output);

    setApiOutput(`${output}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    setUserInputText(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const userInputAudience = event.target.userInputAudience.value;
    const userInputFormality = event.target.userInputFormality.value;
    const userInputDomain = event.target.userInputDomain.value;
    const userInputVolume = event.target.userInputVolume.value;
    const userInputLanguage = event.target.userInputLanguage.value;
    const userInputSimple = event.target.userInputSimple.value;
    const userInputCompelling = event.target.userInputCompelling.value;
    const userInputText = event.target.userInputText.value;
    const userInputCondition = event.target.userInputCondition.value;

    const newFormData = {
      ...formData,
      userInputAudience,
      userInputFormality,
      userInputDomain,
      userInputVolume,
      userInputLanguage,
      userInputSimple,
      userInputCompelling,
      userInputText,
      userInputCondition,
    };

    setFormData(newFormData);

    callGenerateEndpoint();
  };

  return (
    <div className="root">
      <Head>
        <title>GPT Rewriter</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GPT Rewriter</h1>
          </div>
          <div className="header-subtitle">
            <h2>Rewrite your text as you like</h2>
          </div>
        </div>
        <div className="Input-output">
          <form onSubmit={onFormSubmit}>
            <div>
              <div className="option-box">
                <p>Audience:</p>
                <label>
                  <input
                    type="radio"
                    name="userInputAudience"
                    value="General"
                  />
                  General
                </label>
                <label>
                  <input
                    type="radio"
                    name="userInputAudience"
                    value="Knowledgeable"
                  />
                  Knowledgeable
                </label>
                <label>
                  <input type="radio" name="userInputAudience" value="Expert" />
                  Expert
                </label>
              </div>
              <div className="option-box">
                <p>Formality:</p>
                <label>
                  <input
                    type="radio"
                    name="userInputFormality"
                    value="Informal"
                  />
                  Informal
                </label>
                <label>
                  <input
                    type="radio"
                    name="userInputFormality"
                    value="Natural"
                  />
                  Natural
                </label>
                <label>
                  <input
                    type="radio"
                    name="userInputFormality"
                    value="Formal"
                  />
                  Formal
                </label>
              </div>
              <div className="option-box">
                <p>Role:</p>
                <label>
                  <input type="radio" name="userInputDomain" value="General" />
                  General
                </label>
                <label>
                  <input type="radio" name="userInputDomain" value="Startup" />
                  Startup
                </label>
                <label>
                  <input type="radio" name="userInputDomain" value="Investor" />
                  Investor
                </label>
              </div>

              <div className="option-box">
                <p>Volume:</p>
                <label>
                  <input type="radio" name="userInputVolume" value="General" />
                  General
                </label>
                <label>
                  <input type="radio" name="userInputVolume" value="Twitter" />
                  Twitter
                </label>
                <label>
                  <input type="radio" name="userInputVolume" value="Mail" />
                  Mail
                </label>
              </div>
              <div className="option-box">
                <p>Language:</p>
                <label>
                  <input
                    type="radio"
                    name="userInputLanguage"
                    value="English"
                  />
                  English
                </label>
                <label>
                  <input
                    type="radio"
                    name="userInputLanguage"
                    value="Japanese"
                  />
                  Japanese
                </label>
              </div>
              <div className="option-box">
                <p>Others:</p>
                <label>
                  <input
                    type="checkbox"
                    name="userInputSimple"
                    value="Simple"
                  />
                  Simple
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="userInputCompelling"
                    value="Compelling"
                  />
                  Compelling
                </label>
              </div>
            </div>

            <label>
              Additional conditions
              <textarea
                name="userInputCondition"
                className="prompt-box"
              ></textarea>
            </label>
            <label>
              Input Text:
              <textarea name="userInputText" className="prompt-box"></textarea>
            </label>

            <button type="submit" className="generate-button ">
              Submit
            </button>
          </form>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p id="text-to-copy">{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
