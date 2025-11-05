'use client';

import { MultiAgent, Agent, createNode } from "../../src";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function Home() {
    const [promptResponse, setPromptResponse] = useState('');
    const [step, setStep] = useState<'form' | 'loading' | 'output'>('form');
    //const projectDesc = "Put together a {x} minute workout with 2-5 exercises per muscle group. Include a quick snack suggestion based on the provided ingredient if an ingredient is provided."

    const getAgentReponse = async () => {
        const genAI = new GoogleGenerativeAI('AIzaSyBfdwSpeB7hMaLXgyKVW_RghvR6ZJVQTpw');
    
        const agent1 = createNode(async (store) => {
            const prompt = "Write a concise haiku to how tasty and great pho is."
            //const prompt = `${projectDesc}\n\nYour task: `;
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const result = await model.generateContent(prompt);
            store.response = result.response.text();
            return store;
        });

        const agent = new Agent(agent1);

        agent.decide({}).then(result => {
            console.log(result.response);
            setPromptResponse(result.response);
            setStep("output");
        });
    };

    const handleSubmit = () => {
        // start and get Multiagent response with getAgentResponse();
        setStep("loading");
        getAgentReponse();
    };

    const renderStep = () => {
        if (step === "loading") {
            return (
                <div className="text-center">
                    <h1>Loading...</h1>
                </div>
            );
        } else if (step === "form") {
            return (
                <div className="flex flex-col h-full justify-around items-center">
                    form goes here
                    <button className="hover:opacity-55" onClick={() => handleSubmit()}><img src='/workout4u/images/button.png' alt='border' width={100}/></button>
                </div>
            );
        } else {
            return (
                <div>
                    <p className="text-ultramarine p-8 text-center">{promptResponse}</p>
                </div>
            );
        }
    };
    

    return (
        <div className="bg-[url(/workout4u/svgs/background.svg)] w-full h-screen bg-cover bg-top">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] bg-perfume/70 pixel-border1 flex flex-col items-center justify-around pb-5">
                    <h1 className="text-shadow-lg">WORKOUT4U</h1>
                    <section className="w-3/4 h-3/4 bg-perfume pixel-border2">
                        {renderStep()}
                    </section>
                </div>
            </div>
        </div>
    );
}