import * as signalR from "@microsoft/signalr";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:7285/chat";

class Connector {

    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;

    constructor() {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build(); //initializes instance of Connection to Chat Hub

        this.connection.start().catch(err => document.write(err)); // starts a connection with the chathub

        this.events = (onMessageReceived) => {
            this.connection.on("messageReceived", (username, message) => {
                onMessageReceived(username, message);


            });
        }; // Listens for a message from Chat Hub
    }

    public newMessage = (messages: string) => {
        this.connection.send("NewMessage", "foo", messages).then(x => console.log("sent"))
    }
    //Sends a message to the ChatHub

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    } //Returns a static instance of the Connector class to ensure only one instance
}
export default Connector.getInstance;