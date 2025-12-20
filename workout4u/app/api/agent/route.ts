import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MultiAgent, Agent, createNode } from "@/src/index";

export async function POST(req: Request) {
    const request = await req.json();
    const prompt = request.prompt;
    const muscle1 = request.muscle1;
    const muscle2 = request.muscle2;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

        const agent1 = createNode(async (store) => {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const result = await model.generateContent(prompt);
            store.response = result.response.text();
            return store;
        });

        const agent = new Agent(agent1);
        const result = await agent.decide({});

        return NextResponse.json( 
            { response: result.response },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
}
