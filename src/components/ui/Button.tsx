'use client';

import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import { motion, MotionStyle, TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';

const MotionLink = motion.create(Link);

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'handmade';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

// Slightly irregular corners so buttons don't read as a perfect pill.
const IRREGULAR_RADIUS: CSSProperties = {
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '6px',
  borderBottomLeftRadius: '10px',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-blush-500 text-white font-sans font-medium',
  outline: 'bg-transparent text-blush-500 border-[1.5px] border-blush-500 font-sans font-medium',
  ghost: 'bg-transparent text-charcoal-soft font-sans font-medium',
  handmade: 'bg-blush-200 text-blush-600 border-[1.5px] border-dashed border-blush-400 font-handwritten',
};

const VARIANT_STYLE: Partial<Record<ButtonVariant, MotionStyle>> = {
  primary: IRREGULAR_RADIUS,
  outline: IRREGULAR_RADIUS,
  handmade: { ...IRREGULAR_RADIUS, rotate: -0.5 },
};

const HOVER_ANIMATION: Record<ButtonVariant, TargetAndTransition> = {
  primary: {
    scale: 1.02,
    y: -1,
    backgroundColor: '#D93670',
    boxShadow: '0 10px 24px -8px rgba(217, 54, 112, 0.45)',
  },
  outline: {
    backgroundColor: '#FDE7EC',
  },
  ghost: {},
  handmade: {
    rotate: 0,
    scale: 1.02,
  },
};

const GHOST_UNDERLINE =
  'relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-blush-400 after:transition-[width] after:duration-200 hover:after:w-full';

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  href,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const sharedClasses = cn(
    'inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-colors duration-200',
    variant === 'handmade' ? 'text-lg' : SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    variant === 'ghost' && GHOST_UNDERLINE,
    disabled && 'cursor-not-allowed opacity-50',
    className
  );

  const style = VARIANT_STYLE[variant];
  const whileHover = disabled ? undefined : HOVER_ANIMATION[variant];
  const whileTap = disabled ? undefined : { scale: 0.98 };

  if (href && !disabled) {
    return (
      <MotionLink
        href={href}
        className={sharedClasses}
        style={style}
        onClick={onClick}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      className={sharedClasses}
      style={style}
      onClick={onClick}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.button>
  );
}
