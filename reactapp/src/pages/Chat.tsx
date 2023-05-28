import { useEffect, useState } from "react";
import Axios from "axios";
import useFetch from "../hooks/useFetch";
import { FetchResults } from "../utils/Types";
import Connector from "../signalr-connection";
import { Button } from "@mui/material";
import Contact from "../components/Contact";
import Message from "../components/Message";

import "../styles/pages/Chat.css";

type ChatResponse = {
    chatId: number,
    authUserId: string,
    recievingAuthUserId: string,
    text: string,
    date: Date
};

function Chat() {
    const { newMessage, events } = Connector();
    const [message, setMessage] = useState("");
   // const [chatHistory, setChatHistory] = useState([]);

    // const [name, setName] = useState("");

/*    const fetchChatHistory = async () => {
        const { data } = await Axios.get(
            "https://localhost:7285/api/Chat?userId=EX100"
        );
        const chatHistory = data;
        setChatHistory(chatHistory);
        console.log(chatHistory);
    };
*/
    
    
    const { loading, error, fetchData, response }: FetchResults =
        useFetch<ChatResponse[]>({
            url: "CHAT",
            method: "GET",
            query: "?userId=EX100"
        });

    useEffect(() => {

        fetchData()

    },[]);

    useEffect(() => {

        if (response) {
            console.log("Response", response);
        }

    }, [response]);

    function formSubmit(e: any) {
        e.preventDefault();

        console.log("Form submitted", message);

        setMessage("");
    }

    // useEffect(() => {
    //     events((_, message) => setMessage(message));
    // });

    return (
        <div className="chat">
            <section className="chat__container">
                <aside className="chat__sidebar">
                    <header className="chat__header">
                        <h1>Contacts</h1>
                    </header>

                    <main className="chats__aside-contacts">
                        <Contact
                            lastMessage="Some message"
                            picture=""
                            name="John Doe"
                        />
                        <Contact
                            lastMessage="Some message"
                            picture=""
                            name="Mpho Doe"
                        />
                        <Contact
                            lastMessage="Some message"
                            picture=""
                            name="Leon Doe"
                        />
                    </main>
                </aside>

                <main className="chat__main">
                    <header className="chat__header">
                        <h1>Chat</h1>
                    </header>

                    <main className="chat__messages">
                        <Message
                            isMine={false}
                            timestamp={new Date().toLocaleTimeString()}
                            message="Hy"
                        />
                        <Message
                            isMine={true}
                            timestamp={new Date().toLocaleTimeString()}
                            message="How are you"
                        />
                        <Message
                            isMine={false}
                            timestamp={new Date().toLocaleTimeString()}
                            message="I'm good how are you?"
                        />
                        <Message
                            isMine={true}
                            timestamp={new Date().toLocaleTimeString()}
                            message="I'm alright"
                        />
                        <Message
                            isMine={true}
                            timestamp={new Date().toLocaleTimeString()}
                            message="So what do you want"
                        />
                    </main>

                    <footer className="chat__footer">
                        <form onSubmit={formSubmit}>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                placeholder="Type a message"
                            />
                            <Button
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "0px",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                                type="submit"
                                onClick={() => newMessage(message)}
                            >
                                Send
                            </Button>
                        </form>
                    </footer>
                </main>
            </section>

            {/* <span>
                message from signalR:{" "}
                <span style={{ color: "green" }}>{message}</span>{" "}
            </span>

            <form>
                <label>
                    Enter your name:
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
            </form>

            <br />
            <button onClick={() => newMessage("From SingalR: " + message)}>
                send date{" "}
            </button> */}
        </div>
    );
}

export default Chat;
