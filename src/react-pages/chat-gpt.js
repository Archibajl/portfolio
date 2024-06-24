
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-turbo-16k",
    prompt: "",
    messages: [],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 5,
    presence_penalty: 0,
  });

  const thread = await openai.beta.threads.create();


function Chat_GPT() {
    return (
        <div>
            <h2>If you haven't seen or interacted with Chat GPT yet, try it here.</h2>
            <div>
                prompt();
            </div>
        </div>

    )
}

export default Chat_GPT;