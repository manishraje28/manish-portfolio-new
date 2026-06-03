import { useState, useRef } from "react";

const ParallaxBackground = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Playback failed:", e));
    }
  };

  return (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full -z-50 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-right md:object-center"
        >
          <source src="/manu-vide.mp4" type="video/mp4" />
        </video>
        {/* Mobile-only gradient overlay to guarantee text readability when video is cropped */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 md:hidden mix-blend-multiply" />
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-1 right-1 md:bottom-5 md:right-5 z-[50] px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-xs md:text-lg hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-2"
      >
        {isMuted ? "🔇 Unmute Video" : "🔊 Mute Video"}
      </button>
    </>
  );
};

export default ParallaxBackground;
