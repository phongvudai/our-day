"use client";

import { motion } from "framer-motion";
import QRcode from "react-qr-code";
import { SceneProps } from "../WeddingStory";

const accounts = [
  {
    bank: "VIETCOMBANK",
    accountNumber: "1034 9221 32",
    accountName: "BUI MINH THAO MY",
    qrCode:
      "00020101021138540010A00000072701240006970436011010349221320208QRIBFTTA53037045802VN6304B4F3",
  },
  {
    bank: "TPBANK",
    accountNumber: "8436 3830 369",
    accountName: "VU DAI PHONG",
    qrCode:
      "0002010102111531397007040052044600008436383036938550010A000000727012500069704230111843638303690208QRIBFTTA5204513753037045802VN5912VU DAI PHONG6006Ha Noi8707PREMIUM63045DE0",
  },
];

export default function Scene5RSVP({}: SceneProps) {
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
                  💌
                </motion.div>
                <div className="w-16 h-px bg-fuscia mx-auto mb-4" />
                <p className="typography-body text-rose-500">
                  Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình
                  chúng tôi
                </p>
              </div>

              {accounts.map((account) => (
                <div
                  key={account.accountNumber}
                  className="relative group mb-4"
                >
                  <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                    <div className="flex items-center justify-center space-x-4">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {account.bank}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {account.accountName}
                        </p>
                      </div>
                    </div>

                    <p className="font-mono text-gray-700">
                      {account.accountNumber}
                    </p>
                    <div className="flex items-center justify-center">
                      <QRcode size={180} value={account.qrCode} />
                    </div>
                  </div>
                </div>
              ))}
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
