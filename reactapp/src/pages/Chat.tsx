import React, { useEffect, useState } from 'react';
import '../App.css';
import Connector from '../signalr-connection';
import { Button } from "@mui/material";

function Chat() {
    const { newMessage, events } = Connector();
    const [message, setMessage] = useState("initial value");
   // const [name, setName] = useState("");

    useEffect(() => {
        events((_, message) => setMessage(message));
    });

    return (
        <div className="App">
            <span>message from signalR: <span style={{ color: "green" }}>{message}</span> </span>

            <form>
                <label>Enter your name:
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
            </form>

            
            <br />
            <button onClick={() => newMessage("From SingalR: " + message)}>send date </button>
        </div>
    );
}

export default Chat;