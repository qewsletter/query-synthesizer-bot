import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { toast } from "sonner";

interface Message {
  text: string;
  isAi: boolean;
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setMessages([{
      text: `I've loaded "${selectedFile.name}". What would you like to know about it?`,
      isAi: true
    }]);
  };

  const handleSendMessage = async (message: string) => {
    if (!file) {
      toast.error("Please upload a PDF first");
      return;
    }

    setMessages(prev => [...prev, { text: message, isAi: false }]);
    setIsLoading(true);

    // Simulate AI response for now
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm analyzing your question about the PDF. This is a placeholder response - the actual Gemini API integration will be implemented in the next step.",
        isAi: true
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">PDF Chat Assistant</h1>
        
        {!file && <FileUpload onFileSelect={handleFileSelect} />}
        
        {file && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <div className="flex-1 truncate">
                <p className="font-medium">Current PDF: {file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isAi={message.isAi}
                />
              ))}
            </div>

            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;