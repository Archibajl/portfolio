import OpenAI from "openai";
import React, { useState } from 'react';


   
           
    function ChatBot() {
        const [prompt, setPrompt] = useState([""]) ;
        const [responses, setResponses] = useState([""]);
        const [loading, setLoading] = useState(false);
    
        
        return(
        <div>
            <h2>If you haven't seen or interacted with Chat GPT yet, try it here.</h2>
            <div className="chat-prompt">
                <textarea
                    id="prompt"
                    value={responses}
                    rows={30}
                />
                <br />
                <input
                    value="text"
                    onChange={val => {
                        this.setPrompt(this.responses + val.target.value);
                        val.target.textContent = "";
                        this.GPTAPICall();
                    }
                    }
                    type="text"
                    autoComplete="on" />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
            </div>
        </div>
        );

        const chatGPT = openai.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: "gpt-3.5-turbo-turbo-16k",
            prompt: this.prompt,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 5,
            presence_penalty: 0
        });
         
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

        async function GPTAPICall() {
            try {
                var res = chatGPT.choices[0].text;
                this.setResponses(this.responses + [res]);
                this.setPrompt(this.responses)
                console.log(res);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    

export default ChatBot;