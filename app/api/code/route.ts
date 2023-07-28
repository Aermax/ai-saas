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
        const { messages }= body

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
        //         prompt: 'You are a Code generation assistant.You generates code in markdown only thus just explain code and no extra talking.'+ messages
        //       }
        //     }
        //   )

        await incrementApiLimit()

        // return NextResponse.json(response)
        return NextResponse.json([' Sure,', " I'd", ' be', ' happy', ' to', ' help!', " Here's", ' an', ' example', ' of', ' how', ' you', ' could', ' create', ' a', ' navbar', ' in', ' React', ' using', ' Markdown', ' code:\n###', ' Navbar\n\nThe', ' navbar', ' component', ' is', ' a', ' fundamental', ' component', ' in', ' many', ' web', ' applications,', ' and', " it's", ' easy', ' to', ' create', ' one', ' in', ' React', ' using', ' the', ' `nav`', ' element.', " Here's", ' an', ' example', ' of', ' how', ' you', ' could', ' create', ' a', ' basic', ' navbar', ' in', ' React:\n```\n<nav>\n', ' ', ' <ul>\n', '   ', ' <li><a', ' href="#home">Home</a></li>\n', '   ', ' <li><a', ' href="#about">About</a></li>\n', '   ', ' <li><a', ' href="#contact">Contact</a></li>\n', ' ', ' </ul>\n</nav>\n```\n\nThis', ' code', ' creates', ' a', ' basic', ' navbar', ' with', ' three', ' links:', ' one', ' to', ' the', ' "Home"', ' page,', ' one', ' to', ' the', ' "About"', ' page,', ' and', ' one', ' to', ' the', ' "Contact"', ' page.', ' The', ' `nav`', ' element', ' is', ' a', ' block-level'])
    } catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal server error", {status : 500})
    }

}

