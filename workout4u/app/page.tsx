'use client';

import { MultiAgent, Agent, createNode } from "../src";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function Home() {
    const [promptResponse, setPromptResponse] = useState('');
    const [step, setStep] = useState<'form' | 'loading' | 'output'>('form');
    //const projectDesc = "Put together a {x} minute workout with 2-5 exercises per muscle group. Include a quick snack suggestion based on the provided ingredient if an ingredient is provided."

    const getAgentReponse = async (muscleInput1: string, muscleInput2: string) => {
        //const prompt = `${projectDesc}\n\nYour task: `;
        const payload = { 
            prompt: "Write a concise haiku to how great and beneficial strength training is.",
            muscle1: muscleInput1,
            muscle2: muscleInput2,
        }

        const res = await fetch('/workout4u/api/agent', {
            method: "POST",
            body: JSON.stringify(payload),
        })

        const data = await res.json();
        console.log(data.response);
        setPromptResponse(data.response);
        setStep("output");
    };

    const handleSubmit = () => {
        // start and get Multiagent response with getAgentResponse();
        setStep("loading");
        getAgentReponse("1","2");
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
                    <form action="">
                        <div className="text-center">
                            <label htmlFor="muscle1">Choose a muscle group:</label>
                            <select name="muscle1" id="muscle1">
                                <option value=""></option>
                                <option value="back">Back</option>
                                <option value="biceps">Biceps</option>
                                <option value="triceps">Triceps</option>
                                <option value="shoulders">Shoulders</option>
                                <option value="quads">Quads</option>
                                <option value="glutes">Glutes</option>
                                <option value="hamstrings">Hamstrings</option>
                                <option value="abs">Abs</option>
                            </select>
                        </div>
                        <br/><br/>
                        <div className="text-center">
                            <label htmlFor="muscle1">Choose a second muscle group:</label>
                            <select name="muscle2" id="muscle2">
                                <option value=""></option>
                                <option value="back">Back</option>
                                <option value="biceps">Biceps</option>
                                <option value="triceps">Triceps</option>
                                <option value="shoulders">Shoulders</option>
                                <option value="quads">Quads</option>
                                <option value="glutes">Glutes</option>
                                <option value="hamstrings">Hamstrings</option>
                                <option value="abs">Abs</option>
                            </select>
                        </div>
                        <br/><br/>
                    </form> 
                    
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
                <div className="w-1/2 h-[80vh] min-w-[400px] min-h-[500px] bg-perfume/70 pixel-border1 flex flex-col items-center justify-around pb-5">
                    <h1 className="text-shadow-lg">WORKOUT4U</h1>
                    <section className="w-3/4 h-3/4 bg-perfume pixel-border2">
                        {renderStep()}
                    </section>
                </div>
            </div>                
        </div>
    );
}