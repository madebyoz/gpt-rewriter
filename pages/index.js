import Head from "next/head";
import { useState } from "react";
import ClipboardJS from "clipboard";

const Home = () => {
  const [userInputAudience, setUserInputAudience] = useState("");
  const [userInputFormality, setUserInputFormality] = useState("");
  const [userInputDomain, setUserInputDomain] = useState("");
  const [userInputText, setUserInputText] = useState("");
  const [userInputCondition, setUserInputCondition] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInputAudience,
        userInputFormality,
        userInputDomain,
        userInputCondition,
        userInputText,
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

        <div className="prompt-container">
          <div class="column-container">
            <div class="column_propmt">
              <p>Audience</p>
              <select
                id="audience"
                value={userInputAudience}
                onChange={(e) => setUserInputAudience(e.target.value)}
                size="3"
              >
                <option value="General">General</option>
                <option value="Knowledgeable">Knowledgeable</option>
                <option value="Expert">Expert</option>
              </select>
            </div>{" "}
            <div class="column_propmt">
              <p>Formality</p>
              <select
                id="framework"
                value={userInputFormality}
                onChange={(e) => setUserInputFormality(e.target.value)}
                size="3"
              >
                <option value="Informal">Informal</option>
                <option value="Natural">Natural</option>
                <option value="Formal">Formal</option>
              </select>
            </div>{" "}
            <div class="column_propmt">
              <p>Role</p>
              <select
                id="framework"
                value={userInputDomain}
                onChange={(e) => setUserInputDomain(e.target.value)}
                size="3"
              >
                <option value="Academic">Startup</option>
                <option value="Investor">Investor</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
          <p>Condition</p>
          <textarea
            className="prompt-box"
            placeholder="Type here"
            value={userInputCondition.role}
            onChange={onUserChangedText}
          />
          <p>Put your text</p>
          <textarea
            className="prompt-box"
            placeholder="Type here"
            value={userInputText.role}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>
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
