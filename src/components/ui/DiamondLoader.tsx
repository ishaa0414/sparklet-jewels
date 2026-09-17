'use client';

import { motion } from 'framer-motion';

export interface DiamondLoaderProps {
  size?: number;
}

const FACE_STYLE = {
  position: 'absolute' as const,
  inset: 0,
  transform: 'rotate(45deg)',
  borderRadius: '5px',
  backfaceVisibility: 'hidden' as const,
};

export default function DiamondLoader({ size = 56 }: DiamondLoaderProps) {
  return (
    <div style={{ perspective: 500 }} className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      >
        {/* front facet */}
        <div
          style={{
            ...FACE_STYLE,
            background: 'linear-gradient(135deg, #F8A6BC 0%, #E94F83 55%, #D93670 100%)',
            boxShadow: '0 6px 16px -6px rgba(217, 54, 112, 0.5)',
            transform: 'translateZ(3px) rotate(45deg)',
          }}
        />
        {/* back facet — slightly darker so the flip reads as a solid gem, not a flat card */}
        <div
          style={{
            ...FACE_STYLE,
            background: 'linear-gradient(135deg, #E94F83 0%, #C22E63 55%, #A82454 100%)',
            transform: 'translateZ(-3px) rotate(45deg) rotateY(180deg)',
          }}
        />
        {/* center facet line — catches the light as it spins */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * 0.9,
            height: 2,
            background: 'rgba(255,255,255,0.65)',
            transform: 'translateZ(4px)',
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
