import React, { useState, type KeyboardEvent, type ChangeEvent } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";

interface ChatMessage {
    sender: "user" | "bot";
    text: string;
}

interface ChatBoxProps {
    onClose: () => void;
}

const sampleQuestions: string[] = [
    "What are your pricing plans?",
    "How does AI assistance work?",
    "Can I connect to external APIs?",
];

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
    const [minimized, setMinimized] = useState<boolean>(false);
    const [showSamples, setShowSamples] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState<string>("");

    const handleSend = (): void => {
        if (!inputText.trim()) return;

        const userMsg: ChatMessage = { sender: "user", text: inputText.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInputText("");

        // Simulate bot response
        setTimeout(() => {
            const botMsg: ChatMessage = {
                sender: "bot",
                text: `You asked: "${userMsg.text}". Response coming soon...`,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    const handleClear = (): void => {
        setMessages([]);
        setShowSamples(false);
    };

    const handleSampleClick = (question: string): void => {
        const userMsg: ChatMessage = { sender: "user", text: question };
        setMessages((prev) => [...prev, userMsg]);
        setShowSamples(false);

        // Simulate bot reply
        setTimeout(() => {
            const botMsg: ChatMessage = {
                sender: "bot",
                text: `Answer for "${question}" coming soon...`,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 500);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(23, 23, 23, 0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1050,
            }}
        >
            <MDBCard
                style={{
                    width: "80vw",
                    height: "80vh",
                    maxHeight: minimized ? "40px" : "80vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "max-height 0.25s ease-in-out",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                }}
            >
                <MDBCardBody
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        padding: "0.5rem 1rem",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: minimized ? 0 : "0.5rem",
                        }}
                    >
                        <h6 className="mb-0" style={{ fontWeight: 600 }}>
                            AI Powered Chat Box
                        </h6>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <MDBTooltip tag="div" title={minimized ? "Maximize" : "Minimize"}>
                                <MDBBtn
                                    size="sm"
                                    color="light"
                                    className="shadow-0"
                                    onClick={() => setMinimized((prev) => !prev)}
                                >
                                    <MDBIcon fas icon={minimized ? "window-maximize" : "window-minimize"} />
                                </MDBBtn>
                            </MDBTooltip>

                            <MDBTooltip tag="div" title="Clear Chat">
                                <MDBBtn
                                    size="sm"
                                    color="light"
                                    className="shadow-0"
                                    onClick={handleClear}
                                >
                                    <MDBIcon fas icon="trash" />
                                </MDBBtn>
                            </MDBTooltip>

                            <MDBTooltip tag="div" title="Close Chat">
                                <MDBBtn
                                    size="sm"
                                    color="light"
                                    className="shadow-0"
                                    onClick={onClose}
                                >
                                    <MDBIcon fas icon="times" />
                                </MDBBtn>
                            </MDBTooltip>
                        </div>
                    </div>

                    {!minimized && (
                        <>
                            {/* Chat Messages */}
                            <div
                                style={{
                                    flexGrow: 1,
                                    overflowY: "auto",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    padding: "0.5rem",
                                    backgroundColor: "#f8f9fa",
                                    fontSize: "0.9rem",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {messages.length === 0 ? (
                                    <p style={{ color: "#666" }}>How can I help you today?</p>
                                ) : (
                                    messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                justifyContent:
                                                    msg.sender === "user" ? "flex-end" : "flex-start",
                                                marginBottom: "0.4rem",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        msg.sender === "user" ? "#007bff" : "#e9ecef",
                                                    color:
                                                        msg.sender === "user" ? "white" : "black",
                                                    padding: "0.5rem 0.75rem",
                                                    borderRadius: "12px",
                                                    maxWidth: "70%",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Input Row + Show Samples Button */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >


                                <input
                                    type="text"
                                    placeholder="Type a message"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    style={{
                                        flexGrow: 1,
                                        padding: "0.375rem 0.75rem",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        fontSize: "0.9rem",
                                    }}
                                />

                                <MDBBtn
                                    color="dark"
                                    size="sm"
                                    style={{
                                        boxShadow: "none"
                                    }}
                                    onClick={() => setShowSamples((prev) => !prev)}
                                >
                                    {showSamples ? "Hide Samples" : "Show Samples"}
                                </MDBBtn>

                                <MDBBtn
                                    color="danger"
                                    size="sm"
                                    onClick={handleSend}
                                    
                                >
                                    <MDBIcon fas icon="paper-plane" />
                                </MDBBtn>
                            </div>

                            {/* Sample Questions Section */}
                            {showSamples && (
                                <div
                                    style={{
                                        marginTop: "0.5rem",
                                        borderTop: "1px solid #ddd",
                                        paddingTop: "0.5rem",
                                    }}
                                >
                                    {sampleQuestions.map((q, idx) => (
                                        <MDBBtn
                                            key={idx}
                                            size="sm"
                                            color="light"
                                            style={{
                                                display: "block",
                                                marginTop: "0.3rem",
                                                textAlign: "left",
                                                width: "100%",
                                                whiteSpace: "normal",
                                            }}
                                            onClick={() => handleSampleClick(q)}
                                        >
                                            {q}
                                        </MDBBtn>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default ChatBox;
