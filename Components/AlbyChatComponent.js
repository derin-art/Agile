import { useChannel } from "./AblyReactEffect";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/firebaseUserContext";
import { v4 as uuidv4 } from "uuid";

export default function Ably() {
  let inputBox = null;
  let messageEnd = null;
  const {
    userData,
    sendMessage,
    currentJoinedTeam,
    currentTeam,
    deleteAllTeamMessages,
  } = useAuth();

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel("chat-demo", (message) => {
    // Here we're computing the state that'll be drawn into the message history
    // We do that by slicing the last 199 messages from the receivedMessages buffer

    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);

    // Then finally, we take the message history, and combine it with the new message
    // This means we'll always have up to 199 message + 1 new message, stored using the
    // setMessages react useState hook
  });
  const sendChatMessage = (messageText) => {
    var d = new Date(); // for now

    const dateRevised = d.toLocaleTimeString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const id = uuidv4();
    sendMessage({
      message: messageText,
      timesent: dateRevised,
      sender: userData.name,
      id: id,
      email: userData.email,
    });
    channel.publish({
      name: "chat-message",
      data: {
        message: messageText,
        timesent: dateRevised,
        sender: userData.name,
        id: id,
        email: userData.email,
      },
    });
    setMessageText("");
    inputBox.focus();
  };
  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };
  const handleKeyPress = (e) => {
    if (e.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    e.preventDefault();
  };

  let teamMessagesToBeRendered;

  if (userData.role === "TeamMember") {
    teamMessagesToBeRendered = currentJoinedTeam;
  } else {
    teamMessagesToBeRendered = currentTeam;
  }

  const alreadySentMessages = teamMessagesToBeRendered[0].chatHistory.Chats.map(
    (message, index) => {
      const author = message.email === userData.email ? true : false;

      return (
        <div
          key={message.id}
          data-author={author}
          className={`text-white w-full p-1 flex relative mb-4 h-fit ${
            author ? "justify-end" : ""
          }`}
        >
          <div
            className={`${author ? "right-2 flex-row-reverse" : "left-2"} flex`}
          >
            <div className={`${author ? "ml-2" : "mr-2"}`}>
              <div className="bg-indigo-900 h-6 w-6 rounded-full items-center justify-center flex font-mono">
                {message.sender[0]}
              </div>
              <div className="text-xs text-gray-600">{message.sender}</div>
            </div>

            <div
              className={`${
                author ? "bg-green-500" : "bg-green-400"
              }   rounded px-2 max-w-[250px] flex items-center justify-center`}
            >
              {" "}
              {message.message}
            </div>
          </div>
        </div>
      );
    }
  );
  const messages = receivedMessages.map((message, index) => {
    console.log("mssg", message);
    const author = message.data.email === userData.email ? true : false;
    return (
      <div
        key={message.data.id}
        data-author={author}
        className={`text-white w-full p-1 flex relative h-fit mt-4 ${
          author ? "justify-end" : ""
        }`}
      >
        <div
          className={`${
            author ? "justify-self-end flex-row-reverse" : "left-2 "
          } flex`}
        >
          <div className={`${author ? "ml-2" : "mr-2"}`}>
            <div className="bg-indigo-900 h-6 w-6 rounded-full items-center justify-center flex font-mono">
              {message.data.sender[0]}
            </div>
            <div className="text-xs text-gray-600 w-10 truncate">
              {message.data.sender}
            </div>
          </div>

          <div
            className={`        ${
              author ? "bg-green-500" : "bg-green-400"
            } bg-green-400 rounded px-2 max-w-[250px] flex items-center justify-center`}
          >
            {" "}
            {message.data.message}
          </div>
        </div>
      </div>
    );
  });

  const sendIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="fill-green-400"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 13h6v-2H3V1.846a.5.5 0 0 1 .741-.438l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154V13z" />
    </svg>
  );

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });
  return (
    <div className="border p-2">
      <div className="h-80 overflow-auto font-Josefin">
        {alreadySentMessages}
        {messages}
        <div
          ref={(element) => {
            messageEnd = element;
          }}
        ></div>
      </div>
      <form onSubmit={handleFormSubmission} className="w-full flex border">
        <textarea
          ref={(element) => {
            inputBox = element;
          }}
          value={messageText}
          placeholder="Type a message..."
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full font-Josefin p-1"
        ></textarea>
        <button
          type="submit"
          className="font-Josefin flex items-center justify-center p-1"
          disabled={messageTextIsEmpty}
        >
          Send <div className="ml-1">{sendIcon}</div>
        </button>
      </form>
      <button
        onClick={() => {
          deleteAllTeamMessages();
        }}
      >
        delete
      </button>
    </div>
  );
}
