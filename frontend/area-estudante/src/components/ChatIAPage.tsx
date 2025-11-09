import { useState } from "react";
import { Send, TrendingUp, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Conversa {
  id: number;
  alunoNome: string;
  alunoAvatar: string;
  ultimaMensagem: string;
  horario: string;
  novasMensagens: number;
}

interface Mensagem {
  id: number;
  tipo: 'aluno' | 'ia';
  texto: string;
  horario: string;
}

export function ChatIAPage() {
  const [conversaSelecionada, setConversaSelecionada] = useState<number>(1);
  const [mensagemTexto, setMensagemTexto] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversas: Conversa[] = [
    {
      id: 1,
      alunoNome: 'Ana Silva',
      alunoAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      ultimaMensagem: 'Como posso melhorar meu código Python?',
      horario: '10:45',
      novasMensagens: 2
    },
    {
      id: 2,
      alunoNome: 'Carlos Santos',
      alunoAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      ultimaMensagem: 'Qual a diferença entre useState e useEffect?',
      horario: '10:30',
      novasMensagens: 0
    },
    {
      id: 3,
      alunoNome: 'Mariana Costa',
      alunoAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      ultimaMensagem: 'Obrigada! Entendi agora.',
      horario: '09:15',
      novasMensagens: 0
    },
    {
      id: 4,
      alunoNome: 'Pedro Oliveira',
      alunoAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      ultimaMensagem: 'Pode me explicar sobre arrays?',
      horario: 'Ontem',
      novasMensagens: 1
    },
  ];

  const mensagens: Record<number, Mensagem[]> = {
    1: [
      { id: 1, tipo: 'aluno', texto: 'Olá! Estou com dificuldades em Python.', horario: '10:30' },
      { id: 2, tipo: 'ia', texto: 'Olá, Ana! Fico feliz em ajudar. Qual é a sua dúvida específica sobre Python?', horario: '10:31' },
      { id: 3, tipo: 'aluno', texto: 'Como posso melhorar meu código Python?', horario: '10:45' },
      { id: 4, tipo: 'ia', texto: 'Existem várias práticas recomendadas! Vou te dar algumas dicas: 1) Use nomes de variáveis descritivos, 2) Siga o PEP 8 para estilo de código, 3) Escreva funções pequenas e reutilizáveis. Quer que eu elabore mais algum desses pontos?', horario: '10:46' },
    ],
    2: [
      { id: 1, tipo: 'aluno', texto: 'Qual a diferença entre useState e useEffect?', horario: '10:30' },
      { id: 2, tipo: 'ia', texto: 'Ótima pergunta! useState é usado para gerenciar estado local no componente, enquanto useEffect é usado para efeitos colaterais como chamadas de API, subscrições, etc. Posso te dar exemplos práticos?', horario: '10:31' },
    ],
  };

  const conversaAtual = conversas.find(c => c.id === conversaSelecionada);
  const mensagensAtuais = mensagens[conversaSelecionada] || [];

  const filteredConversas = conversas.filter(c =>
    c.alunoNome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Monitoramento de Chat IA
        </h1>
        <p className="text-gray-400 mt-2">Acompanhe as conversas dos alunos com a IA</p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 overflow-hidden">
          <div className="p-4 border-b border-[#A8C5FF]/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-[#A8C5FF]/10 bg-white/5 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100%-80px)]">
            {filteredConversas.map((conversa) => (
              <button
                key={conversa.id}
                onClick={() => setConversaSelecionada(conversa.id)}
                className={`w-full p-4 flex items-start gap-3 border-b border-[#A8C5FF]/5 hover:bg-[#A8C5FF]/5 transition-colors ${
                  conversaSelecionada === conversa.id ? 'bg-gradient-to-r from-[#6A00FF]/20 to-[#C7A3FF]/20' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-[#A8C5FF]/20">
                    <AvatarImage src={conversa.alunoAvatar} />
                    <AvatarFallback>{conversa.alunoNome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversa.novasMensagens > 0 && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#6A00FF] text-white text-xs flex items-center justify-center">
                      {conversa.novasMensagens}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{conversa.alunoNome}</span>
                    <span className="text-xs text-gray-500">{conversa.horario}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{conversa.ultimaMensagem}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 overflow-hidden flex flex-col">
          {/* Chat Header */}
          {conversaAtual && (
            <div className="p-4 border-b border-[#A8C5FF]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-[#A8C5FF]/20">
                  <AvatarImage src={conversaAtual.alunoAvatar} />
                  <AvatarFallback>{conversaAtual.alunoNome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white">{conversaAtual.alunoNome}</h4>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors text-sm">
                <TrendingUp size={16} />
                Ver Progresso
              </button>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {mensagensAtuais.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.tipo === 'aluno' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.tipo === 'aluno'
                        ? 'bg-gradient-to-br from-[#C7A3FF]/30 to-[#6A00FF]/30 text-white'
                        : 'bg-gradient-to-br from-[#A8C5FF]/30 to-[#002B8E]/30 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.texto}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.horario}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-[#A8C5FF]/10">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Digite uma mensagem para intervir..."
                value={mensagemTexto}
                onChange={(e) => setMensagemTexto(e.target.value)}
                className="flex-1 rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white placeholder:text-gray-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setMensagemTexto('');
                  }
                }}
              />
              <button className="px-6 py-2 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Mensagens do administrador aparecerão como intervenção manual
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
