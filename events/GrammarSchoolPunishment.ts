import {EventHandler} from "../EventHandler";
import {Client, Events, Message} from "discord.js";
import {getRandomElement} from "../util";

const grammarMemes : string[] = ["https://i.ibb.co/HCNNy86/gram-15.jpg",
"https://i.ibb.co/605cVBv/grammar-14.jpg",
"https://i.ibb.co/Qj3yQ8f/gram-13.jpg",
"https://i.ibb.co/SVQCyrZ/gram-12.jpg",
    "https://i.ibb.co/S7mwp1s/gram-11.jpg",
                "https://i.ibb.co/rfXSLpM/gram-10.jpg",
                    "https://i.ibb.co/303L5FH/gram-9.jpg",
                        "https://i.ibb.co/qMSXb1F/gram-8.jpg",
                            "https://i.ibb.co/YX0JNwp/gram-7.jpg",
                                "https://i.ibb.co/dgkXy3b/gram-6.jpg",
                                    "https://i.ibb.co/ZN7N7Kd/gram-5.jpg",
                                        "https://i.ibb.co/BcWHDQq/gram-4.jpg",
                                            "https://i.ibb.co/FBpbVks/gram-3.jpg",
                                                "https://i.ibb.co/5j5rTdr/gram.jpg",
                                                   "https://i.ibb.co/crCdJ3S/Untitled-2.jpg"
]
export const eventHandler: EventHandler<Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message){
        if(message.content.toLowerCase().includes("grammar") && message.author.id == "1140794078271897621"){
            const randomElement = getRandomElement(grammarMemes);
            await message.reply({embeds: [{title: "EPIC GRAMMAR MEME!1!1!11!!11!11!1", image: {url: randomElement}}]})
        }
    }
}