import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: "r8_Kkt7YAQ9YvqDsUvt192Q9PhmcAil6IK11lksL",
})

export async function POST(
    req:Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount=1, resolution="512x512" } = body

        if(!userId){
            return new NextResponse("Unauthorized", {status: 500})
        }

        if(!prompt){
            return new NextResponse("Prompt is Required", {status: 400})
        }

        if(!amount){
            return new NextResponse("Amount is Required", {status: 400})
        }
        if(!resolution){
            return new NextResponse("Resolution is Required", {status: 400})
        }

        const freeTrial = await checkApiLimit()

        if(!freeTrial) {
            return new NextResponse("Free trial has ended!", 
            {status: 403})
        }

        await incrementApiLimit()

        return NextResponse.json( [{prompt, url:"/img.jpg"}])
    } catch (error) {
        console.log("[CONVERSION_ERROR]", error)
        return new NextResponse("Internal server error", {status : 500})
    }

}

