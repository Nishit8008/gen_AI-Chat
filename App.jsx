import React, { useState } from "react";
import './index.css';
import Navbar from "./components/Navbar";
import ChatWindow from "./components/ChatWindow";
import OutputPanel from "./components/OutputPanel";
import FileUploader from "./components/FileUploader";
import { mockData } from "./mock/mockData";

export default function GenAIChatLayout() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything about your data." }
  ]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
    const [enableVisualization, setEnableVisualization] = useState(true);

 const sendMessage = async () => {
    if (!input) {
      if (files.length) {
        alert("Enter what to do with the file(s)");
        return;
      }
      alert("Please enter a message.");
      return;
    }

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const formData = new FormData();
    formData.append("query", input);
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      // Call chat API
      const chatRes = await fetch("dummy api for chat", {
        method: "POST",
        body: formData,
      });
      console.log("calling chat")
      const chatData = await chatRes.json();
      setMessages((prev) => [...prev, { role: "bot", text: chatData.answer || "No response." }]);

      // Conditionally call visualize API
      const shouldVisualize = enableVisualization && /chart|graph|table|visual/i.test(input);
      if (shouldVisualize) {
        console.log("calling vis api");
        const visRes = await fetch("dummy api for visulization", {
          method: "POST",
          body: formData,
        });
        const visData = await visRes.json();
        setResponseData(visData);
      } else {
        setResponseData(null);
      }

      setFiles([]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [...prev, { role: "bot", text: "⚠️ Error contacting API" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar showAbout={showAbout} setShowAbout={setShowAbout} />
      <div className="flex-1 flex flex-col md:flex-row">
        <ChatWindow
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          triggerFileSelect={() => document.getElementById("fileInput").click()}
        >
          <FileUploader files={files} setFiles={setFiles} />
        </ChatWindow>

        <OutputPanel
          responseData={responseData}
          setResponseData={setResponseData}
          mockData={mockData}
        />
      </div>
    </div>
  );
}
