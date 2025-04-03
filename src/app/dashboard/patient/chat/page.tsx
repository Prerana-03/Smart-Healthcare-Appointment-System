"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

// Healthcare-specific responses
const healthcareResponses: Record<string, string[]> = {
  hospital: [
    "Based on your location, here are some recommended hospitals:\n1. Victoria Hospital\n2. Manipal Hospital\n3. Apollo Hospital\nWould you like more details about any of these?",
    "I can help you find the best hospital for your needs. What type of medical care are you looking for?",
  ],
  appointment: [
    "I can help you book an appointment. Would you like to:\n1. Book a new appointment\n2. Check existing appointments\n3. Cancel an appointment",
    "Sure, I can assist with appointments. Which specialist would you like to see?",
  ],
  symptoms: [
    "I understand you're not feeling well. Could you please describe your symptoms in detail so I can better assist you?",
    "To help you better, please let me know:\n- How long have you had these symptoms?\n- Are they constant or intermittent?\n- Have you taken any medication?",
  ],
  emergency: [
    "If you're experiencing a medical emergency, please call emergency services immediately at 102 or visit your nearest emergency room.",
    "This sounds serious. Please seek immediate medical attention. Would you like me to show you the nearest emergency facilities?",
  ],
  prescription: [
    "For prescription-related queries, please consult with your doctor. I can help you schedule an appointment if needed.",
    "While I can't provide medical advice, I can help you connect with a healthcare provider to discuss your prescription.",
  ],
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your healthcare assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Check for keywords in the input
    for (const [key, responses] of Object.entries(healthcareResponses)) {
      if (lowerInput.includes(key)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // If no specific keyword is found, provide a general response
    const generalResponses = [
      "I'm here to help with your healthcare needs. Could you please provide more details about your query?",
      "I can assist you with appointments, finding hospitals, or checking symptoms. What would you like to know?",
      "How can I assist you with your healthcare needs today?",
    ];

    return generalResponses[
      Math.floor(Math.random() * generalResponses.length)
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with a small delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Health Assistant</h1>

      {/* Chat Messages */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">Typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary px-6" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
