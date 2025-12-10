"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import useSound from "use-sound";

import Scene1Envelope from "./scenes/Scene1Envelope";
import Scene2Blessing from "./scenes/Scene2Blessing";
import Scene3DateTheme from "./scenes/Scene3DateTheme";
import Scene4Extras from "./scenes/Scene4Extras";
import Scene5RSVP from "./scenes/Scene5RSVP";
import Scene6Wishes from "./scenes/Scene6Wishes";

const scenes = [
  Scene1Envelope,
  Scene2Blessing,
  Scene3DateTheme,
  Scene4Extras,
  Scene6Wishes,
  Scene5RSVP,
];

// Scenes that should not auto-advance (0-indexed)
const noAutoAdvanceScenes = [0, 5]; // Scene1Envelope and Scene6Wishes

interface WeddingStoryProps {
  onComplete?: () => void;
}

export interface SceneProps {
  onNext: () => void;
  onPrev: () => void;
  isActive: boolean;
}

export default function WeddingStory({ onComplete }: WeddingStoryProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isAudioError, setIsAudioError] = useState(false);
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);

  // Background music - add your wedding music file to public/audio/
  const [play, { stop, pause, sound }] = useSound("/our-day/audio/wedding-music.webm", {
    loop: true,
    volume: 2,
    preload: true, // Preload the audio file
    onload: () => {
      console.log("Wedding music loaded successfully");
      setIsAudioLoaded(true);
      setIsAudioError(false);
    },
    onloaderror: (error: Error) => {
      console.log(
        "Could not load wedding music. Please add wedding-music.mp3 to public/audio/",
        error
      );
      setIsAudioLoaded(false);
      setIsAudioError(true);
    },
  });

  const nextScene = useCallback(() => {
    if (currentScene === 0) {
      setHasOpenedInvitation(true);
    }
    if (currentScene < scenes.length - 1) {
      setCurrentScene((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentScene, onComplete]);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying || noAutoAdvanceScenes.includes(currentScene)) return;

    const timer = setTimeout(() => {
      nextScene();
    }, 60000); // 60 seconds per scene

    return () => clearTimeout(timer);
  }, [currentScene, isPlaying, nextScene]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying || noAutoAdvanceScenes.includes(currentScene)) {
      // For non-auto-advance scenes, set progress to 0 and don't animate
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const duration = 30000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        progressRef.current = setTimeout(updateProgress, 50);
      }
    };

    updateProgress();

    return () => {
      if (progressRef.current) {
        clearTimeout(progressRef.current);
      }
    };
  }, [currentScene, isPlaying]);

  // Audio control - only play when audio is loaded
  useEffect(() => {
    if (!isAudioLoaded || isAudioError) {
      console.log("Audio not ready yet, waiting...", {
        isAudioLoaded,
        isAudioError,
      });
      return;
    }

    if (!isMuted && isPlaying) {
      console.log("Starting music playback");
      play();
    } else {
      console.log("Pausing music playback");
      pause();
    }

    return () => {
      // Cleanup on component unmount
      if (sound) {
        stop();
      }
    };
  }, [
    isMuted,
    isPlaying,
    isAudioLoaded,
    isAudioError,
    play,
    pause,
    sound,
    stop,
  ]);

  // Auto-start music when loaded (if not muted)
  useEffect(() => {
    if (isAudioLoaded && !isMuted && isPlaying) {
      console.log("Audio loaded, auto-starting music");
      play();
    }
  }, [isAudioLoaded, isMuted, isPlaying, play]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        stop();
      }
    };
  }, [sound, stop]);

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  const restart = () => {
    setCurrentScene(0);
    setIsPlaying(true);
    setHasOpenedInvitation(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const CurrentSceneComponent = scenes[currentScene];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-50 flex gap-1 pointer-events-none">
        {scenes.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width:
                  index < currentScene
                    ? "100%"
                    : index === currentScene
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Audio control */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        title={
          !isAudioLoaded && !isAudioError
            ? "Loading music..."
            : isAudioError
            ? "Music failed to load"
            : isMuted
            ? "Unmute music"
            : "Mute music"
        }
      >
        {!isAudioLoaded && !isAudioError ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : isAudioError ? (
          <VolumeX size={20} className="text-red-400" />
        ) : isMuted ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>

      {/* Restart button (shown on last scene) */}
      {currentScene === scenes.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            restart();
          }}
          className="absolute top-4 right-16 z-50 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      )}

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <CurrentSceneComponent
            onNext={nextScene}
            onPrev={prevScene}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {hasOpenedInvitation && currentScene > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevScene();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Previous scene"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {hasOpenedInvitation && currentScene < scenes.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextScene();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Next scene"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
