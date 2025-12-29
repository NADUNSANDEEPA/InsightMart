import React, { useState, type KeyboardEvent, type ChangeEvent } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { ChatBotService, type ReportResponse } from "../../../../services/ChatBotService";
import Swal from "sweetalert2";

interface ChatMessage {
    sender: "user" | "bot";
    text: string;
}

interface ChatBoxProps {
    onClose: () => void;
}

const reports = [
    { report_code: "DSR001", report_name: "Daily Sales" },
    { report_code: "WSR001", report_name: "Weekly Sales" },
    { report_code: "MPR001", report_name: "Monthly Sales Report" },
    { report_code: "ISR001", report_name: "Inventory Stock" },
    { report_code: "CFR001", report_name: "Customer Feedback" },
    { report_code: "RPR001", report_name: "Revenue Report" },
    { report_code: "CPBR001", report_name: "Customer Purchase Trends" },
    { report_code: "RRR001", report_name: "Refunds & Returns" },
    { report_code: "CSR001", report_name: "Customer Segmentation" }
];

const sampleQuestions: string[] = [
    "I want to generate a daily sales report",
    "I want weekly sales details",
    "I want to generate a monthly performance report",
];

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
    const [minimized, setMinimized] = useState<boolean>(false);
    const [showSamples, setShowSamples] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [questionListForReport, setQueationListForReport] = useState<string[]>([])

    const [journeyStage, setJournerStage] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [parameterAnswers, setParameterAnswers] = useState<Record<string, string>>({});
    const [askingParameters, setAskingParameters] = useState(false);

    const handleSend = async (): Promise<void> => {
        if (!inputText.trim()) return;

        const userMsg: ChatMessage = { sender: "user", text: inputText.trim() };
        setMessages((prev) => [...prev, userMsg]);
        const currentInput = inputText.trim();
        setInputText("");

        if (!journeyStage) {
            const result: ReportResponse = await ChatBotService.generateReport(currentInput);
            console.log(result);

            if (result) {
                const report = reports.find(r => r.report_code === result.report_code);
                setJournerStage(1);
                setQueationListForReport(result.parameters_for_report_generate || []);
                setParameterAnswers({});
                setQuestionIndex(0);

                if (report) {
                    setTimeout(() => {
                        const botMsg: ChatMessage = {
                            sender: "bot",
                            text: `Do you want to generate <b>${report.report_name}</b> Report?`
                        };
                        setMessages((prev) => [...prev, botMsg]);
                    }, 600);

                    setTimeout(() => {
                        const botMsg: ChatMessage = {
                            sender: "bot",
                            text: `Answer: Yes / No only.`
                        };
                        setMessages((prev) => [...prev, botMsg]);
                    }, 1200);
                }
            }
            return;
        }

        if (journeyStage === 1) {
            const normalizedInput = currentInput.toLowerCase();

            if (normalizedInput !== "yes" && normalizedInput !== "no") {
                setTimeout(() => {
                    const botMsg: ChatMessage = {
                        sender: "bot",
                        text: `Answer must be: Yes or No only.`
                    };
                    setMessages((prev) => [...prev, botMsg]);
                }, 600);
                return;
            }

            if (normalizedInput === "no") {
                setTimeout(() => {
                    const botMsg: ChatMessage = {
                        sender: "bot",
                        text: `Okay, the process has been cancelled.`
                    };
                    setMessages((prev) => [...prev, botMsg]);
                }, 600);
                setJournerStage(0);
                return;
            }

            if (normalizedInput === "yes") {
                setTimeout(() => {
                    const botMsg: ChatMessage = {
                        sender: "bot",
                        text: `Great! Let's provide the report parameters one by one.`
                    };
                    setMessages(prev => [...prev, botMsg]);
                    setJournerStage(2);
                    askNextParameter(0);
                }, 600);
                return;
            }
        }

        if (journeyStage === 2) {
            const currentQuestion = questionListForReport[questionIndex];
            setParameterAnswers(prev => ({
                ...prev,
                [currentQuestion]: currentInput
            }));

            const nextIndex = questionIndex + 1;
            if (nextIndex < questionListForReport.length) {
                setQuestionIndex(nextIndex);
                askNextParameter(nextIndex);
            } else {
                setJournerStage(0);
                setTimeout(() => {
                    const finalMessage = Object.entries({
                        ...parameterAnswers,
                        [currentQuestion]: currentInput
                    })
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ");

                    const botMsg: ChatMessage = {
                        sender: "bot",
                        text: `
                                🎉 <b>All Parameters Collected!</b> 🎉<br/><br/>
                                ${Object.entries({ ...parameterAnswers, [currentQuestion]: currentInput })
                                                            .map(([key, value], idx) => `✅ <b>${key}</b>: ${value}`)
                                                            .join("<br/>")}<br/><br/>
                                You can now proceed with the report generation. 📊
                            `
                    };
                    setMessages(prev => [...prev, botMsg]);


                }, 600);
            }
        }
    };

    const askNextParameter = (index: number) => {
        const question = questionListForReport[index];
        setTimeout(() => {
            const botMsg: ChatMessage = {
                sender: "bot",
                text: `${index + 1}. ${question}:`
            };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    const handleClear = (): void => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to clear the chat?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear it!",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Confirm again",
                    text: "This will permanently remove all messages. Proceed?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes, clear",
                    cancelButtonText: "Cancel"
                }).then((secondResult) => {
                    if (secondResult.isConfirmed) {
                        setMessages([]);
                        setShowSamples(false);
                        Swal.fire("Cleared!", "Chat has been cleared.", "success");
                    }
                });
            }
        });
    };

    const handleSampleClick = (question: string): void => {
        setInputText(question);
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
                                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                                marginBottom: "0.4rem",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: msg.sender === "user" ? "#007bff" : "#e9ecef",
                                                    color: msg.sender === "user" ? "white" : "black",
                                                    padding: "0.5rem 0.75rem",
                                                    borderRadius: "12px",
                                                    maxWidth: "70%",
                                                    wordBreak: "break-word",
                                                }}
                                                {...(msg.sender === "bot" ? { dangerouslySetInnerHTML: { __html: msg.text } } : {})}
                                            >
                                                {msg.sender === "user" ? msg.text : null}
                                            </div>
                                        </div>
                                    )))}
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
