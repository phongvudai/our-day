"use client";

import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { SceneProps } from "../WeddingStory";

interface ScheduleItem {
  time: string;
  title: string;
  location: string;
  locationLink: string;
}

const scheduleItems: ScheduleItem[] = [
  {
    time: "5:00 AM",
    title: "Lễ ăn hỏi",
    location: "Gia đình nhà gái",
    locationLink: "https://maps.app.goo.gl/Hr4QPsSVHLUDYpj16",
  },
  {
    time: "9:00 AM",
    title: "Lễ thành hôn",
    location: "Gia đình nhà trai",
    locationLink: "https://maps.app.goo.gl/2oUNMvPDiLnjoD3r7",
  },
];

export default function Scene3DateTheme({}: SceneProps) {
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      initial={{
        background: "linear-gradient(to bottom right, #ffffff, #EAE6E1)",
      }}
      animate={{
        background: "linear-gradient(to bottom right, #FC8EAC, #FC46AA)",
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#FC46AA_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-start h-full px-6 py-8 text-center relative z-10 overflow-y-auto">
        {/* Header with Date */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="typography-heading text-white mb-4">
            The day the heavens will smile
          </h2>

          {/* Date Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-fuscia/20 mb-6">
            <h1 className="typography-hero text-rose-500 mb-1">Chủ Nhật</h1>
            <div className="text-5xl font-decorative font-bold text-gray-800 mb-1">
              28
            </div>
            <h2 className="typography-subheading text-gray-700 mb-1">
              Tháng 12
            </h2>
            <div className="typography-formal text-2xl font-medium text-rose-500">
              2025
            </div>
          </div>

          {/* Location Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="w-5 h-5 text-white mr-2" />
                </div>
                <p className="typography-formal text-lg font-medium text-white">
                  Trường Thi
                </p>
                <p className="text-sm text-white/80 font-medium">
                  Ninh Bình
                </p>
                <p className="text-sm text-white/80 font-medium">
                  (Thành Lợi - Vụ Bản - Nam Định)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <h3 className="typography-subheading text-white">Lịch trình</h3>
          </div>
          <div className="w-16 h-px bg-white/60 mx-auto mb-6" />

          {/* Timeline */}
          <div className="relative">
            {/* Main vertical line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-white/60"></div>

            <div className="space-y-8">
              {scheduleItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.15,
                    ease: "easeOut",
                  }}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-4 h-4 bg-white rounded-full border-2 border-white/80 shadow-lg z-10"></div>

                  {/* Content */}
                  <div className="ml-6 flex-1 text-left">
                    {/* Time */}
                    <div className="mb-2">
                      <h3 className="typography-formal text-xl font-bold text-white tracking-wide">
                        {item.time}
                      </h3>
                    </div>

                    <div className="mb-2">
                      <h4 className="typography-formal text-base font-medium text-white/95 uppercase tracking-wider">
                        {item.title}
                      </h4>
                    </div>

                    {/* Event Title and Location Pin */}
                    <div className="flex items-center justify-between">
                      <h4 className="typography-formal text-base font-medium text-white/95 tracking-wider">
                        Tại {item.location}
                      </h4>

                      <button
                        onClick={() =>
                          window.open(item.locationLink, "_blank")
                        }
                        className="ml-3 p-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-200 hover:scale-110 group"
                        title={`Navigate to ${item.location}`}
                      >
                        <MapPin className="w-4 h-4 text-white group-hover:text-white/90" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-full max-w-md mt-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">
                SĐT liên hệ
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <a
                  href="tel:0975142475"
                  className="text-white hover:text-white/80 transition-colors duration-200 font-medium"
                >
                  Cô dâu: 0975 142 475
                </a>
              </div>

              <div className="text-center">
                <a
                  href="tel:0363830369"
                  className="text-white hover:text-white/80 transition-colors duration-200 font-medium"
                >
                  Chú rể: 0363 830 369
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-500/20 text-lg"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            >
              {["✨", "🌟", "💫"][i % 3]}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
