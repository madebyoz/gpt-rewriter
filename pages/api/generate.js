import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
I will specify the sentences I want to rewrite and the style I want to use
Rewrite the sentences entered by the user in the style specified by the user.The reply will only be the rewritten text, no explanation of it.
`;

const generateAction = async (req, res) => {
  const {
    userInputAudience,
    userInputFormality,
    userInputDomain,
    userInputCondition,
    userInputText,
  } = req.body;
  console.log(`API: ${basePromptPrefix}
  ${req.body.userInputAudience}
  ${req.body.userInputFormality}
  ${req.body.userInputDomain}
  ${req.body.userInputCondition}
  ${req.body.userInputText}`);

  const baseCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      /*{ role: "system", content: "You are a good writer" },*/
      {
        role: "user",
        content: `${basePromptPrefix}

        Level of knowledge of the reader of the text:${req.body.userInputAudience},
        Formality of the sentence:${req.body.userInputFormality},
        Who you are going to rewrite the text as:${req.body.userInputDomain},
        Other conditions: ${req.body.userInputCondition},
        The sentences entered by the user: ${req.body.userInputText}`,
      },
    ],
  });
  console.log("baseCompletion: " + baseCompletion.data.choices[0].message);

  const basePromptOutput = baseCompletion.data.choices[0].message.content;
  console.log("basePromptOutPut: " + basePromptOutput);

  res.status(200).json({ output: basePromptOutput, status: 200 });
};

export default generateAction;