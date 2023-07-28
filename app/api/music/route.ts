import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: "r8_Kkt7YAQ9YvqDsUvt192Q9PhmcAil6IK11lksL",
})

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

        if(!freeTrial) {
            return new NextResponse("Free trial has ended!", 
            {status: 403})
        }

        // const response = await replicate.run(
        //     "a16z-infra/llama13b-v2-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8",
        //     {
        //       input: {
        //         prompt: messages
        //       }
        //     }
        //   )

        await incrementApiLimit()

        //   return NextResponse.json(response)

        return NextResponse.json(["Hello", "this", "is", "Creata"])
    } catch (error) {
        console.log("[CONVERSION_ERROR]", error)
        return new NextResponse("Internal server error", {status : 500})
    }

}

