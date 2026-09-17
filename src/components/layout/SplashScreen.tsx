'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkle, Star } from '@/components/ui/ScrapbookDecorations';

const MIN_VISIBLE_MS = 900;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
      return () => window.removeEventListener('load', hide);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cream"
        >
          <Sparkle
            size={22}
            color="#F8A6BC"
            className="pointer-events-none absolute left-[14%] top-[22%] rotate-12 opacity-60"
          />
          <Star
            size={28}
            color="#F27AA2"
            className="pointer-events-none absolute right-[16%] top-[30%] -rotate-12 opacity-50"
          />
          <Heart
            size={20}
            color="#E94F83"
            className="pointer-events-none absolute bottom-[26%] left-[20%] rotate-6 opacity-50"
          />
          <Sparkle
            size={16}
            color="#E94F83"
            className="pointer-events-none absolute bottom-[30%] right-[18%] opacity-60"
          />

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="relative flex h-16 w-16 items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkle size={64} color="#F27AA2" />
            </motion.div>

            <motion.div
              className="flex items-center gap-1.5"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display text-[20px] font-bold leading-none tracking-tight text-charcoal sm:text-[24px]">
                SPARKLET JEWELS
              </span>
              <Heart size={16} color="#F27AA2" />
            </motion.div>

            <span className="font-handwritten text-[22px] leading-none text-blush-500">
              sprinkling on the sparkle...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
