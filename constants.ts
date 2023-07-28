import { Code, ImageIcon, MessageSquare, Music, Video } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label:"Conversation",
    href:"/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
},
{
    label:"Image Generation",
    href:"/image",
    icon: ImageIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
},
{
    label:"Video Generation",
    href:"/video",
    icon: Video,
    color: "text-green-300",
    bgColor: "bg-green-300/10"
},

{
    label:"Music Generation",
    href:"/music",
    icon: Music,
    color: "text-blue-300",
    bgColor: "bg-blue-300/10"
},
{
    label:"Code Generation",
    href:"/code",
    icon: Code,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
}
];