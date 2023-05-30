import { useEffect, useState } from "react";
import Axios from "axios";
import useFetch from "../hooks/useFetch";
import { useUser } from "../hooks/stateHooks";
import { FetchResults } from "../utils/Types";
import Connector from "../signalr-connection";
import { Button } from "@mui/material";
import Contact from "../components/Contact";
import Message from "../components/Message";

import "../styles/pages/Chat.css";

type ChatResponse = {
    chatId?: number,
    authUserId?: string,
    recievingAuthUserId?: string,
    text: string,
    date: Date
};

function Chat() {
    const { user } = useUser();
   // const { newMessage, events } = Connector();
    const { JoinGroup, events } = Connector();
    const [message, setMessage] = useState("");

    const { loading, error, fetchData, response }: FetchResults =
        useFetch<ChatResponse[]>({
            url: "CHAT",
            method: "GET",
            query: "?userId=EX100"
        });

/*    useEffect(() => {
        events((_, message) => console.log(message));
    },[]);*/

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
        var newChat = { text: message, date: new Date().toLocaleTimeString() };
        console.log("Form submitted", message);
        response.push(newChat);

        setMessage("");
    }

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

                    {(() => {
                        if (response) {
                            return (
                                <main className="chat__messages">
                                    {response.map((chat: ChatResponse) => (
                                        <Message
                                            isMine={false}
                                            timestamp={(chat.date).toString()}
                                            message={chat.text}
                                        />
                                    ))}
                                </main>
                            )
                        } else {
                            return (
                                <h4> Messages Loading... </h4>
                            )
                        }
                    })()}

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
                                onClick={() => JoinGroup(message,"group Name")}
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
