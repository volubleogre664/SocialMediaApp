import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUser, useContacts, useChats } from "../hooks/stateHooks";
import { FetchResults, UserState, ChatState } from "../utils/Types";
import Connector from "../signalr-connection";
import { Button } from "@mui/material";
import Contact from "../components/Contact";
import Message from "../components/Message";

import "../styles/pages/Chat.css";

function Chat() {
    const { user } = useUser();
    const { contacts, dispatch: setContacts } = useContacts();
    const { chats, dispatch: setChats } = useChats();
    const [currentContact, setCurrentContact] = useState<UserState | null>(
        null
    );
    // const { newMessage, events } = Connector();
    const { JoinGroup, events } = Connector();
    const [message, setMessage] = useState("");

    const {
        fetchData: fetchContacts,
        response: contactsResponse,
    }: FetchResults = useFetch<UserState[]>({
        url: "CONTACTS",
        method: "GET",
    });

    const { loading, error, fetchData, response, setResponse }: FetchResults =
        useFetch<ChatState[]>({
            url: "CHAT",
            method: "GET",
            query: "?userId=EX100",
        });

    const handleContactClick = (contact: UserState) => () => {
        setCurrentContact(contact);
    };

    /*    useEffect(() => {
        events((_, message) => console.log(message));
    },[]);*/

    useEffect(() => {
        fetchData();
        fetchContacts();
    }, []);

    useEffect(() => {
        if (response) {
            console.log("Response", response);
            setChats({ type: "setChats", payload: response });
        }

        return () => {
            setResponse(null);
        };
    }, [response, setChats, setResponse]);

    useEffect(() => {
        if (contactsResponse && !contacts.length) {
            setContacts({ type: "setContacts", payload: contactsResponse });
        }
    }, [contactsResponse, setContacts, contacts]);

    function formSubmit(e: any) {
        e.preventDefault();

        if (!currentContact) {
            return;
        }

        var newChat: ChatState = {
            text: message,
            date: new Date(),
            authUserId: user.authUserId,
            recievingAuthUserId: currentContact?.authUserId,
        };

        JoinGroup(JSON.stringify(newChat), currentContact?.authUserId);

        console.log("Form submitted", message);

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
                        {contacts.length &&
                            contacts.map((contact: UserState) => (
                                <Contact
                                    key={contact.userId}
                                    picture={contact.avatarUrl}
                                    name={`${contact.firstName} ${contact.lastName}`}
                                    onClick={handleContactClick(contact)}
                                />
                            ))}
                    </main>
                </aside>

                <main className="chat__main">
                    <header className="chat__header">
                        <h1>Chat</h1>
                    </header>

                    <main className="chat__messages">
                        {(() => {
                            if (chats.length) {
                                return (
                                    <>
                                        {chats.map((chat: ChatState) => (
                                            <Message
                                                isMine={
                                                    chat.authUserId ===
                                                    user.authUserId
                                                }
                                                key={chat.chatId}
                                                timestamp={chat.date.toString()}
                                                message={chat.text}
                                            />
                                        ))}
                                    </>
                                );
                            } else {
                                return <h4> Messages Loading... </h4>;
                            }
                        })()}
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
            <button type="submit">
                send date{" "}
            </button> */}
        </div>
    );
}

export default Chat;
