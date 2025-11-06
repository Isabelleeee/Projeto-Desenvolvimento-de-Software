import { useState } from "react";
import { Send, Mic, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Olá! Sou o assistente virtual do EstudaAI. Como posso ajudá-lo hoje? Posso responder dúvidas sobre suas trilhas, dar sugestões de estudo ou ajudar a criar novos planos de aprendizado.",
    timestamp: new Date(),
  },
];

const suggestedPrompts = [
  "Como posso estudar lógica melhor?",
  "Preciso de dicas para aprender Python",
  "Qual trilha você recomenda para iniciantes?",
  "Como organizar meu tempo de estudo?",
];

export function ChatAlunoPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simula resposta da IA
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Ótima pergunta! Recomendo praticar diariamente com desafios, revisar conceitos básicos e fazer anotações sobre o que aprender. A consistência é mais importante que longas sessões de estudo esporádicas!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-8 py-10">
      {/* Espaço invisível superior */}
      <div className="h-20"></div>

      {/* Cabeçalho */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Bot size={32} className="text-[#C7A3FF]" />
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Chat com IA
          </h1>
        </div>
        <p className="text-gray-400">
          Converse com nosso assistente virtual para tirar dúvidas e receber orientações.
        </p>
        <div className="h-10"></div>
      </div>

      {/* Área de mensagens */}
      <div className="flex flex-col flex-1 rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10 overflow-hidden">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Ícone */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF]"
                      : "bg-[#1A1A2E]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-[#A8C5FF]" />
                  )}
                </div>

                {/* Mensagem */}
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white"
                        : "bg-white/10 text-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Animação "digitando..." */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1A1A2E]">
                  <Bot className="w-5 h-5 text-[#A8C5FF]" />
                </div>
                <div className="bg-white/10 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#A8C5FF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-[#A8C5FF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-[#A8C5FF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Sugestões + Input */}
        <div className="p-4 border-t border-[#A8C5FF]/10 bg-white/5">
          <div className="mb-4">
            <p className="text-gray-400 mb-2">Sugestões:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptClick(prompt)}
                  className="border-[#A8C5FF]/20 text-[#C7A3FF] hover:bg-[#A8C5FF]/10 text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Entrada de texto */}
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-white/5 border-[#A8C5FF]/10 text-white placeholder:text-gray-500"
            />
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#A8C5FF]/10 hover:bg-[#C7A3FF]/20 text-[#C7A3FF]"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Espaço inferior invisível */}
      <div className="h-20"></div>
    </div>
  );
}
