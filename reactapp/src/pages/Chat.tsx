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
    const { newMessage, events, JoinGroup } = Connector();
    const [message, setMessage] = useState("");

    const {
        fetchData: fetchContacts,
        response: contactsResponse,
        setResponse: setContactResponse
    }: FetchResults = useFetch<UserState[]>({
        url: "CONTACTS",
        method: "GET",
    });

    const { loading, error, fetchData, response, setResponse: setChatResponse }: FetchResults =
        useFetch<ChatState[]>({
            url: "CHAT",
            method: "GET",
            query: "?receiverId=" + user.authUserId + "&senderId=" + currentContact?.authUserId,
        });

    const handleContactClick = (contact: UserState) => () => {
        setCurrentContact(contact);
        JoinGroup(generateGroupName(user.authUserId, contact.authUserId));
        fetchData();

        //console.log(user.authUserId + "has joined Group: " + generateGroupName(user.authUserId, contact.authUserId));
    };

    useEffect(() => {
        events((message) => {
            let chat : ChatState = JSON.parse(message);
            setChats({
                type: "addChat", payload: chat
            })
        });
    },[]);

    useEffect(() => {
        fetchContacts();
        //JoinGroup(user.authUserId);
    }, []);

    useEffect(() => {
        if (response) {
            console.log("Response", response);
            console.log(response);
            setChats({ type: "setChats", payload: response });
        }

        return () => {
            setChatResponse(null);
        };
    }, [response, setChats, setChatResponse]);

    useEffect(() => {
        if (contactsResponse) {
            setContacts({ type: "setContacts", payload: contactsResponse });
        }

        return () => {
            setContactResponse(null);
        };

    }, [contactsResponse, setContacts, setContactResponse]);

    function generateGroupName(firstUser: string, secondUser:  string) {
        let sortedStrings: string[] = [firstUser, secondUser].sort();
        let newString: string = sortedStrings.join(" ");

        return (newString);
    }

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

        newMessage(JSON.stringify(newChat), generateGroupName(user.authUserId, currentContact.authUserId));
        /*newChat.text = "You got a new message bestie";
        newMessage(JSON.stringify(newChat), "414fed45-e2a5-4643-a0ad-367aa0ced2a7");*/

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
                                        <h1> {user.firstName + " chatting with " + currentContact?.firstName}</h1>
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
                                return <h4> Select a user to message </h4>;
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
                                onClick={() =>
                                    newMessage(message, "group Name")
                                }
                            >
                                Send
                            </Button>
                        </form>
                    </footer>
                </main>
            </section>
        </div>
    );
}

export default Chat;
