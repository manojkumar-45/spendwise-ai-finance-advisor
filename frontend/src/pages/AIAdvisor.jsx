import { useEffect, useState, useRef, useContext } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { SendHorizonal, Bot, User } from "lucide-react";

const AIAdvisor = () => {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [financialSummary, setFinancialSummary] = useState(null);

  const bottomRef = useRef(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText, isThinking]);

  /* ---------------- LOAD HISTORY ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        const res = await api.get(`/ai/history/${user.id}`);

        const formatted = res.data.flatMap((m) => [
          { role: "user", text: m.question },
          { role: "ai", text: m.answer },
        ]);

        setMessages(formatted);
      } catch (err) {
        console.log("History load failed");
      }
    };

    loadHistory();
  }, [user]);

  /* ---------------- LOAD FINANCIAL SUMMARY ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchSummary = async () => {
      try {
        const res = await api.get(`/dashboard/${user.id}`);
        setFinancialSummary(res.data);
      } catch (err) {
        console.log("Dashboard summary load failed");
      }
    };

    fetchSummary();
  }, [user]);

  /* ---------------- SMART SUGGESTIONS ---------------- */
  const generateSmartSuggestions = () => {
    if (!financialSummary) return [];

    const income = financialSummary.totalIncome || 0;
    const expense = financialSummary.totalExpense || 0;
    const savings = income - expense;

    const expenseRatio = income > 0 ? (expense / income) * 100 : 0;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    return [
      {
        title: "Analyze Expense Health",
        reply:
          expenseRatio >= 90
            ? `- Your expenses are ${expenseRatio.toFixed(
                1,
              )}% of income.\n- This is financially risky.\n- Reduce non-essential spending.`
            : `- Your expense ratio is ${expenseRatio.toFixed(
                1,
              )}%.\n- This is under control.\n- Maintain spending discipline.`,
      },
      {
        title: "Analyze Savings Health",
        reply:
          savingsRate < 10
            ? `- Your savings rate is ${savingsRate.toFixed(
                1,
              )}%.\n- This is low.\n- Automate savings and cut extra expenses.`
            : `- Your savings rate is ${savingsRate.toFixed(
                1,
              )}%.\n- Good progress.\n- Continue consistent saving.`,
      },
      {
        title: "Check for Investment Readiness",
        reply:
          savingsRate > 20
            ? "- You have strong savings.\n- Consider SIP or index funds.\n- Diversify gradually."
            : "- Focus on improving savings before heavy investments.",
      },
      {
        title: "Emergency Fund Status",
        reply:
          savings < expense * 3
            ? "- Emergency fund may be insufficient.\n- Maintain 3–6 months of expenses.\n- Keep funds liquid."
            : "- Your emergency fund looks stable.\n- Maintain liquidity.",
      },
    ];
  };

  const smartSuggestions = generateSmartSuggestions();

  /* ---------------- FORMAT BULLETS ---------------- */
  const formatAIResponse = (text) => {
    if (text.includes("\n- ")) {
      const points = text
        .split("\n")
        .filter((line) => line.trim().startsWith("-"));

      const emojis = ["💰", "📉", "📊", "🚀", "🏦", "✨"];

      return (
        <div className="space-y-2">
          {points.map((p, index) => (
            <div key={index} className="flex gap-2">
              <span>{emojis[index % emojis.length]}</span>
              <span>{p.replace("- ", "")}</span>
            </div>
          ))}
        </div>
      );
    }
    return <p>{text}</p>;
  };

  /* ---------------- TYPING EFFECT ---------------- */
  const typeResponse = (fullText) => {
    setTypingText("");
    setIsTyping(true);

    let index = 0;

    const interval = setInterval(() => {
      index++;
      setTypingText(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "ai", text: fullText }]);
        setTypingText("");
      }
    }, 18);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");

    // 🔥 Show thinking animation immediately
    setIsThinking(true);

    try {
      const res = await api.post("/ai/advice", {
        userId: user.id,
        question,
      });

      setIsThinking(false);
      typeResponse(res.data);
    } catch (err) {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    }
  };

  /* ---------------- HANDLE SUGGESTION ---------------- */
  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);

    setMessages((prev) => [...prev, { role: "user", text: suggestion.title }]);

    typeResponse(suggestion.reply);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full h-screen flex justify-center bg-gray-100">
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden mt-6 mb-6">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-300 bg-gray-50">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">SpendWise AI</h2>
              <p className="text-sm text-gray-500">
                Smart Financial Advisor 💸
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#f9fafb]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`px-5 py-3 rounded-2xl max-w-[65%] shadow-md text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.role === "ai" ? formatAIResponse(msg.text) : msg.text}
                </div>

                {msg.role === "user" && (
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking Animation */}
            {isThinking && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="px-5 py-3 bg-white rounded-2xl shadow-md flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            {/* Typing Effect */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="px-5 py-3 bg-white rounded-2xl shadow-md text-sm whitespace-pre-line">
                  {typingText}
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input + Suggestions */}
          <div className="relative p-4 border-t border-gray-300 bg-white">
            {showSuggestions && (
              <div className="absolute bottom-25 left-4 right-4 bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-wrap gap-3">
                  {smartSuggestions.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white transition text-sm"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className=" absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  x
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                ⚡
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask financial advice..."
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button
                onClick={handleSend}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white"
              >
                <SendHorizonal size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
