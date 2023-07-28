import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Configuration, OpenAIApi } from "openai";

// const replicate = new Replicate({
//   auth: "r8_Kkt7YAQ9YvqDsUvt192Q9PhmcAil6IK11lksL",
// })

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

export async function POST(
    req:Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if(!userId){
            return new NextResponse("Unauthorized", {status: 500})
        }

        if(!messages){
            return new NextResponse("Messages Required", {status: 400})
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
          return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 1,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

        //Llama LLM

        // const response = await replicate.run(
        //     "a16z-infra/llama13b-v2-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8",
        //     {
        //       input: {
        //         prompt: messages
        //       }
        //     }
        //   )

        if(!isPro){
            await incrementApiLimit()
        }

        //   return NextResponse.json(response)

        return NextResponse.json(response.data.choices[0].message)
    } catch (error) {
        console.log("[CONVERSION_ERROR]", error)
        return new NextResponse("Internal server error", {status : 500})
    }

}

