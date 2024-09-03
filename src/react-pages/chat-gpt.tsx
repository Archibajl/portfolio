import { OpenAI } from "openai";
import React, { useState } from 'react';


const [prompt, setPrompt] = useState < string > ('');
const [responses, setResponses] = useState <Array<string>> ([""]);
const [loading, setLoading] = useState < boolean > (false);


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

    const chatGPT = await openai.completions.create({
    model: "gpt-3.5-turbo-turbo-16k",
    prompt: prompt,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 5,
    presence_penalty: 0
});


function Chat_GPT() {
    return (
        <div>
            <h2>If you haven't seen or interacted with Chat GPT yet, try it here.</h2>
            <div className="chat-prompt">
                <textarea
                    id="prompt"
                    value={responses}
                    rows={30}
                />
                <br/>
                <input 
                value="text" 
                onChange={val => {
                    setPromptValue(val.target.value);
                    val.target.textContent="";
                    GPTAPICall();
                    }
                }
                type="text"
                autoComplete="on" />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
            </div>
        </div>
    );
}

async function GPTAPICall(){
    try{
        var res =  chatGPT.choices[0].text;
        setResponses(responses [res]);
        console.log(res);
    }
    catch(error){
        console.log(error);
    }
}   
function setPromptValue(value :string){
    setPrompt(value);
}

export default Chat_GPT;