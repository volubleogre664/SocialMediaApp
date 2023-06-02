import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useUser, useContacts, useChats } from "../hooks/stateHooks";
import { FetchResults, UserState, ChatState } from "../utils/Types";
import Connector from "../signalr-connection";
import { Button } from "@mui/material";
import Contact from "../components/Contact";
import Message from "../components/Message";
import dayjs from 'dayjs';



import "../styles/pages/Chat.css";

function Chat() {
    const { user } = useUser();
    const { contacts, dispatch: setContacts } = useContacts();
    const { chats, dispatch: setChats, currentContact } = useChats();
    const { newMessage, events, JoinGroup } = Connector();
    const [message, setMessage] = useState("");

    const { fetchData: fetchContacts, response: contactsResponse, setResponse: setContactResponse }:
        FetchResults = useFetch<UserState[]>({
            url: "CONTACTS",
            method: "GET",
            query: "?userId=" + user.authUserId
        });

    const { loading, error, fetchData, response, setResponse: setChatResponse }: FetchResults =
        useFetch<ChatState[]>({
            url: "CHAT",
            method: "GET",
            query: "?receiverId=" + user.authUserId + "&senderId=" + currentContact?.authUserId,
        });

    console.log("Value of currentContact at start: " + currentContact);
    console.log("Value of Chats at start: " + chats);
    if (response != null) {
        console.log("Value of response at start: " + response);
    }
    else {
        console.log("Value of response is null");
    }

    const handleContactClick = (contact: UserState) => () => {
        setChats({
            type: "setCurrentContact", payload: contact
        })
        JoinGroup(generateGroupName(user.authUserId, contact.authUserId));


        //console.log(user.authUserId + "has joined Group: " + generateGroupName(user.authUserId, contact.authUserId));
    };

    useEffect(() => {
        if (currentContact != null) {
            fetchData();
        }
    }, [currentContact])

    useEffect(() => {
        events((message) => {
            let chat: ChatState = JSON.parse(message);
            setChats({
                type: "addChat", payload: chat
            })
        });
    }, []);

    useEffect(() => {
        fetchContacts();
        //JoinGroup(user.authUserId);
    }, []);

    useEffect(() => {
        if (response) {
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

    function generateGroupName(firstUser: string, secondUser: string) {
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

        console.log("Form submitted", message);

        setMessage("");
    }

    return (
        <div className="chat">
            <section className="chat__container">
                <aside className="chat__sidebar">
                    <header className="chat__header">
                        <h1>Contacts {" - " + user.firstName}</h1>

                    </header>
                    <main className="chats__aside-contacts">
                        {contacts.length &&
                            contacts.map((contact: UserState) => (
                                <Contact
                                    key={contact.userId}
                                    picture={contact.avatarUrl}
                                    name={`${contact.firstName} ${contact.lastName}`}
                                    onClick={handleContactClick(contact)}
                                    isActive={currentContact?.userId == contact.userId}
                                />
                            ))}
                    </main>
                </aside>
                <main className="chat__main">
                    <header className="chat__header">
                        <h1>{currentContact && currentContact?.firstName || ""}</h1>
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
                                                timestamp={dayjs(chat.date).format('DD MMM, HH:mm')}
                                                message={chat.text}
                                            />
                                        ))}
                                    </>
                                );
                            }
                        })()}
                    </main>

                    {(() => {
                        if (currentContact != null) {
                            return (
                                <footer className="chat__footer">
                                    <>
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
                                    </>
                                </footer>
                            )
                        }
                    })()}
                </main>
            </section>
        </div>
    );
}

export default Chat;
