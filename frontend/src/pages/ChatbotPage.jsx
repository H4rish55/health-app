import React, { useEffect, useRef, useMemo, useState } from "react";
import { Bot, Send, X, Minus, Sparkles, Loader2 } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/chatStore";

const ChatbotPage = () => {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "b1",
      role: "bot",
      content: "Hey there! How can I help you with your health questions today?",
    },
  ]);

  const { isChatting, chatbot } = useChatStore();

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isChatting]);

  const gradients = useMemo(
    () => ({
      header: "from-indigo-400 to-purple-400",
      bubbleUser: "from-white/10 to-white/5",
      bubbleBot: "from-indigo-400/30 to-purple-400/30",
      ring: "from-indigo-400 via-indigo-500 to-purple-400",
    }),
    []
  );

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || isChatting) return;

    const userMsg = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setText("");

    try {
      // Call your API via the store; get the assistant's text back
      const assistantText = await chatbot({
        messages: nextMessages.map(({ role, content }) => ({
          role: role === "bot" ? "assistant" : role, // normalize roles
          content,
        })),
        context: { model: "assistant", inputs: {} }, // add whatever context you want
      });

      setMessages((m) => [
        ...m,
        {
          id: crypto?.randomUUID?.() ?? String(Date.now() + 1),
          role: "bot",
          content: assistantText || "…",
        },
      ]);
    } catch (error) {
      console.log("chatbot error:", error?.response?.data || error?.message || error);
      setMessages((m) => [
        ...m,
        {
          id: crypto?.randomUUID?.() ?? String(Date.now() + 2),
          role: "bot",
          content:
            "Sorry, I couldn't reach the assistant. Please try again in a moment.",
        },
      ]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button when closed */}
      <AnimatePresence>
        {!open && (
          <Motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setOpen(true)}
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-900/80 border border-white/10 backdrop-blur shadow-lg"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-70 blur-sm bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-400 via-indigo-500 to-purple-400" />
            <Bot className="relative h-6 w-6 text-white group-hover:scale-110 transition" />
          </Motion.button>
        )}
      </AnimatePresence>

      {/* Chat Card */}
      <AnimatePresence>
        {open && (
          <Motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[min(92vw,420px)] overflow-hidden rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur shadow-2xl"
          >
            {/* Header */}
            <div className="relative">
              <div
                className={`h-14 flex items-center justify-between px-4 border-b border-white/10 bg-gradient-to-r ${gradients.header}`}
              >
                <div className="flex items-center gap-2 text-white drop-shadow">
                  <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="leading-tight">
                    <p className="font-semibold">Health Assistant</p>
                    <p className="text-xs opacity-90">Online • Ask anything</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/20 text-white"
                    aria-label="Minimize"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/20 text-white"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={containerRef}
              className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto px-3 py-4 space-y-3"
            >
              {messages.map((m) => (
                <Motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-end gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                      {m.role === "user" ? (
                        <span className="text-xs text-white/80">You</span>
                      ) : (
                        <Bot className="h-4 w-4 text-white/90" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-3 text-sm leading-relaxed border ${
                        m.role === "user"
                          ? "bg-white/10 border-white/10"
                          : "bg-gradient-to-br from-white/5 to-white/10 border-white/10"
                      }`}
                    >
                      <p className="text-white/90 whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                </Motion.div>
              ))}

              {isChatting && (
                <div className="flex items-center gap-2 text-white/80 px-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Thinking…</span>
                </div>
              )}

              {/* Quick suggestions */}
              {!isChatting && (
                <div className="pt-1 grid grid-cols-2 gap-2">
                  {[
                    "Explain my prediction",
                    "How can I lower my risk?",
                    "What do these inputs mean?",
                    "What should I ask my doctor?",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setText(s)}
                      className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Message… (Enter to send, Shift+Enter for new line)"
                  disabled={isChatting}
                  className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={!text.trim() || isChatting}
                  className="absolute bottom-2.5 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 text-white disabled:opacity-50"
                  aria-label="Send"
                >
                  {isChatting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotPage;
