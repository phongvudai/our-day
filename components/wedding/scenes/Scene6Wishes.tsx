"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SceneProps } from "../WeddingStory";
import { User, MessageCircle, Send, Clock } from "lucide-react";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: any;
}

export default function Scene6Wishes({ }: SceneProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [wishes, setWishes] = useState<Wish[]>([]);

  // Fetch wishes from Firestore in real-time
  useEffect(() => {
    const wishesQuery = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc"),
      limit(1000)
    );

    const unsubscribe = onSnapshot(
      wishesQuery,
      (snapshot) => {
        const wishesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          message: doc.data().message,
          createdAt: doc.data().createdAt,
        }));
        setWishes(wishesData);
      },
      (error) => {
        console.error("Error fetching wishes:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "wishes"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      setSubmitStatus("success");
      setName("");
      setMessage("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error saving wish:", error);
      setSubmitStatus("error");

      // Reset error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-white to-beige">
      {/* Watercolor border effect (consistent with other scenes) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-fuscia/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-fuscia/10 to-transparent" />
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-fuscia/10 to-transparent" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-fuscia/10 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="flex flex-col items-center justify-start min-h-full px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl w-full mt-8 mb-8"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-fuscia/20">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl mb-4"
                >
                  💝
                </motion.div>
                <div className="w-16 h-px bg-fuscia mx-auto mb-4" />
                <p className="typography-body text-rose-500">
                  Hãy gửi những lời chúc phúc đến cô dâu chú rể
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <form onSubmit={handleSubmitWish} className="relative">
                  <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg my-4">
                    <div className="space-y-2">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                          <User className="w-4 h-4" />
                          <span>Họ tên</span>
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                          placeholder="Nhập tên của bạn"
                          required
                        />
                      </div>
                      {/* Wish Textarea */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>Lời nhắn nhủ</span>
                        </div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Gửi lời nhắn tới cô dâu chú rể..."
                          className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        {submitStatus === "success" && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-green-600 text-sm"
                          >
                            ✓ Đã gửi thành công!
                          </motion.span>
                        )}
                        {submitStatus === "error" && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-600 text-sm"
                          >
                            ✗ Có lỗi xảy ra. Vui lòng thử lại.
                          </motion.span>
                        )}
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-rose-500 hover:bg-rose-600"
                          }`}
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Đang gửi..." : "Gửi"}</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center mb-4">
                  <h3 className="typography-body text-rose-500">
                    Lời chúc phúc từ mọi người ({wishes.length})
                  </h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      {/* Card content */}
                      <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md hover:shadow-lg transition-shadow">
                        {/* Header */}
                        <div className="flex items-start space-x-3 mb-2">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                              {wish.name[0].toUpperCase()}
                            </div>
                          </div>

                          {/* Name, Time, and Attendance */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-800 text-sm truncate">
                                {wish.name}
                              </h4>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                              <Clock className="w-3 h-3" />
                              <time className="truncate">
                                {wish.createdAt?.toDate
                                  ? new Date(
                                    wish.createdAt.toDate()
                                  ).toLocaleDateString("vi-VN", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                  : ""}
                              </time>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-2 text-left">
                          {wish.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements - consistent with other scenes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-500/10 text-2xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {["✨", "🌟", "💫", "🤍", "🩷", "🌸"][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
