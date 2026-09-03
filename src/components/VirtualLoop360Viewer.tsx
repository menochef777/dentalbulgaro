import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Rotate3d,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Smartphone,
  Tv,
  Volume2,
  VolumeX,
  Sparkles,
  Hand
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

export interface VirtualLoop360ViewerProps {
  currentLang?: Language;
  defaultAspectRatio?: '16:9' | '9:16' | 'auto';
  className?: string;
  showControls?: boolean;
  allowFullscreen?: boolean;
}

export const VirtualLoop360Viewer: React.FC<VirtualLoop360ViewerProps> = ({
  currentLang = 'bg',
  defaultAspectRatio = 'auto',
  className = '',
  showControls = true,
  allowFullscreen = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Aspect ratio state: '16:9' or '9:16'
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartTime, setDragStartTime] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showInteractionHint, setShowInteractionHint] = useState<boolean>(true);

  // Translations
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const loopT = (t as any).loop360 || {
    badge: '360° VIRTUAL LOOP',
    tag: '3D ROTATION',
    toggle169: '16:9 WIDE',
    toggle916: '9:16 PORTRAIT',
    hint: 'DRAG TO ROTATE 360°',
    speed: 'SPEED',
    fullscreen: 'EXPAND',
  };

  // Auto detect initial aspect ratio based on window width or device orientation
  useEffect(() => {
    if (defaultAspectRatio === 'auto') {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setAspectRatio('9:16');
        } else {
          setAspectRatio('16:9');
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      setAspectRatio(defaultAspectRatio);
    }
  }, [defaultAspectRatio]);

  // Video source path based on selected ratio
  const videoSrc = aspectRatio === '9:16' ? '/videos/dental916.mp4' : '/videos/dental169.mp4';

  // Handle Video Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Change Speed
  const cycleSpeed = () => {
    const speeds = [1, 1.5, 0.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Interactive 360 Scrubbing via Mouse / Touch Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!videoRef.current) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartTime(videoRef.current.currentTime);
    if (isPlaying) {
      videoRef.current.pause();
    }
    setShowInteractionHint(false);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !videoRef.current) return;
    const deltaX = e.clientX - dragStartX;
    const duration = videoRef.current.duration || 10;
    // Scrub sensitivity: 300px drag = full rotation loop
    const scrubRatio = deltaX / 350;
    let targetTime = (dragStartTime + scrubRatio * duration) % duration;
    if (targetTime < 0) targetTime += duration;

    videoRef.current.currentTime = targetTime;
    setProgress((targetTime / duration) * 100);
  }, [isDragging, dragStartX, dragStartTime]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (isPlaying && videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [isDragging, isPlaying]);

  // Touch Dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!videoRef.current || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartTime(videoRef.current.currentTime);
    if (isPlaying) {
      videoRef.current.pause();
    }
    setShowInteractionHint(false);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !videoRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const duration = videoRef.current.duration || 10;
    const scrubRatio = deltaX / 300;
    let targetTime = (dragStartTime + scrubRatio * duration) % duration;
    if (targetTime < 0) targetTime += duration;

    videoRef.current.currentTime = targetTime;
    setProgress((targetTime / duration) * 100);
  }, [isDragging, dragStartX, dragStartTime]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (isPlaying && videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [isDragging, isPlaying]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Sync video source change smoothly
  useEffect(() => {
    if (videoRef.current) {
      const currTime = videoRef.current.currentTime;
      videoRef.current.load();
      videoRef.current.currentTime = currTime;
      videoRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [aspectRatio]);

  // Toggle Fullscreen Overlay
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`group/viewer relative w-full rounded-[14px] sm:rounded-[18px] bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-white/[0.14] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_25px_50px_rgba(0,0,0,0.8)] select-none transition-all duration-300 ${
          aspectRatio === '9:16' ? 'max-w-[340px] sm:max-w-[380px] aspect-[9/16] mx-auto' : 'w-full aspect-[16/9]'
        } ${className}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Subtle background grain & radial ambient illumination */}
        <div className="absolute inset-0 bg-subtle-grain opacity-40 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(166,176,159,0.06)_0%,transparent_70%)] pointer-events-none z-10" />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 brightness-[1.02] contrast-[1.05]"
        />

        {/* Architectural Registration Marks */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 text-[9px] sm:text-[10px] font-mono text-[#666666] select-none z-20 pointer-events-none">┌</div>
        <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 text-[9px] sm:text-[10px] font-mono text-[#666666] select-none z-20 pointer-events-none">┐</div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 text-[9px] sm:text-[10px] font-mono text-[#666666] select-none z-20 pointer-events-none">└</div>
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 text-[9px] sm:text-[10px] font-mono text-[#666666] select-none z-20 pointer-events-none">┘</div>

        {/* Top Header Overlay: 360 Badge + Aspect Ratio Switcher */}
        <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between gap-2 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/[0.12] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6B09F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A6B09F]" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#F3F0E9] uppercase font-semibold flex items-center gap-1.5">
              <Rotate3d className="w-3 h-3 text-[#A6B09F]" />
              <span>{loopT.badge || '360° LOOP'}</span>
            </span>
          </div>

          {/* Aspect Ratio Switcher Controls */}
          <div
            className="flex items-center bg-black/60 backdrop-blur-md p-0.5 rounded-full border border-white/[0.12] shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAspectRatio('16:9')}
              title="16:9 Widescreen"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                aspectRatio === '16:9'
                  ? 'bg-[#F3F0E9] text-[#050505] font-bold shadow'
                  : 'text-[#92918C] hover:text-[#F3F0E9]'
              }`}
            >
              <Tv className="w-2.5 h-2.5" />
              <span>16:9</span>
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('9:16')}
              title="9:16 Mobile / Portrait"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider transition-all cursor-pointer ${
                aspectRatio === '9:16'
                  ? 'bg-[#F3F0E9] text-[#050505] font-bold shadow'
                  : 'text-[#92918C] hover:text-[#F3F0E9]'
              }`}
            >
              <Smartphone className="w-2.5 h-2.5" />
              <span>9:16</span>
            </button>
          </div>
        </div>

        {/* Center Hint (Fades out when interacted) */}
        <AnimatePresence>
          {showInteractionHint && !isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="bg-black/50 backdrop-blur-md border border-white/[0.15] px-3.5 py-2 rounded-full flex items-center gap-2 shadow-xl animate-pulse">
                <Hand className="w-3.5 h-3.5 text-[#A6B09F]" />
                <span className="text-[10px] font-mono tracking-[0.16em] text-[#F3F0E9] uppercase">
                  {loopT.hint || 'ARRASTE PARA GIRAR 360°'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dragging State Indicator */}
        {isDragging && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-black/75 backdrop-blur-md border border-[#A6B09F]/40 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
              <Rotate3d className="w-4 h-4 text-[#A6B09F] animate-spin" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#A6B09F] font-bold uppercase">
                {Math.round(progress)}% / 360°
              </span>
            </div>
          </div>
        )}

        {/* Bottom Floating Control Bar */}
        {showControls && (
          <div
            className="absolute bottom-0 inset-x-0 z-20 p-2.5 sm:p-3.5 bg-gradient-to-t from-[#050505]/95 via-[#050505]/60 to-transparent flex flex-col gap-2 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrub Progress Bar */}
            <div
              className="group/track relative w-full h-1.5 sm:h-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer overflow-hidden transition-all"
              onClick={(e) => {
                if (!videoRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                const targetTime = clickPos * (videoRef.current.duration || 10);
                videoRef.current.currentTime = targetTime;
                setProgress(clickPos * 100);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#A6B09F] to-[#F3F0E9] rounded-full transition-[width] duration-75 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md scale-0 group-hover/track:scale-100 transition-transform" />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#92918C]">
              {/* Left Buttons: Play/Pause + Speed */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-[#F3F0E9] transition-colors cursor-pointer"
                  title={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>

                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-[#F3F0E9] transition-colors cursor-pointer text-[9px] font-bold"
                  title="Velocidade de rotação"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Center Spec Info */}
              <div className="hidden sm:flex items-center gap-1.5 text-[9px] tracking-widest text-[#92918C] uppercase">
                <Sparkles className="w-2.5 h-2.5 text-[#A6B09F]" />
                <span>360° PRECISION SCAN</span>
              </div>

              {/* Right Buttons: Mute & Fullscreen */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-[#F3F0E9] transition-colors cursor-pointer"
                  title={isMuted ? 'Ativar Som' : 'Mudo'}
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>

                {allowFullscreen && (
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] text-[#F3F0E9] transition-colors cursor-pointer"
                    title="Modo Expandido / Inspecionar 360"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen High-Definition Inspection Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-condensed font-extrabold text-[22px] tracking-tight text-[#F3F0E9]">
                  RADI
                </span>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#A6B09F] uppercase bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  360° IMMERSIVE SCAN
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3F0E9] text-[11px] font-mono tracking-wider transition-colors cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>FECHAR</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
              <div className="w-full max-w-5xl max-h-full flex items-center justify-center">
                <VirtualLoop360Viewer
                  currentLang={currentLang}
                  defaultAspectRatio={aspectRatio}
                  allowFullscreen={false}
                  className="max-h-[75vh]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#92918C]">
              <span>BLAGOEVGRAD / BG</span>
              <span>DRAG OR USE TIMELINE FOR 360 ROTATION</span>
              <span>SCALE 1:1</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
