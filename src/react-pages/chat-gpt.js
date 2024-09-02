
import OpenAI from "openai";
import React, { useState } from 'react';


const [prompt, setPrompt] = useState < string > ('');
const [response, setResponse] = useState < string | null > (null);
const [loading, setLoading] = useState < boolean > (false);


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function callChat_Gpt_API(){ 
    return openai.completions.create({
    model: "gpt-3.5-turbo-turbo-16k",
    prompt: prompt,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 5,
    presence_penalty: 0,
});
}

const thread = await openai.beta.threads.create();


function Chat_GPT() {
    return (
        <div>
            <h2>If you haven't seen or interacted with Chat GPT yet, try it here.</h2>
            <div class="chat-prompt">
                <textarea
                    id="prompt"
                    rows="30"
                >
                    {
                        response.values
                    }
                </textarea>
                <br/>
                <input 
                value="text" 
                onChange={val => {
                    setPrompt(val.target.value);
                    val="";
                    setResponse( callChat_Gpt_API())
                    }
                }
                type="text"
                autoComplete="on" />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
            </div>
        </div>

    )
}

export default Chat_GPT;