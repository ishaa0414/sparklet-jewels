export interface DecorationProps {
  className?: string;
  size?: number;
  color?: string;
}

export interface TapeStripProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const DEFAULT_COLOR = '#F27AA2';

export function Heart({ className, size = 24, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.6c-.3-.2-.7-.4-1.1-.7-3.3-2.3-6.4-4.8-8.3-8.1C1.5 9.6 1.8 6.9 3.6 5.4c1.7-1.4 4.1-1.2 5.6.4.6.6 1.2 1.3 1.6 2.1.1.2.3.2.4 0 .5-.9 1.1-1.7 1.9-2.3 1.7-1.3 4-1.2 5.5.3 1.5 1.6 1.6 4.2 0 6.2-2 3.2-5 5.6-8.2 7.8-.4.2-.6.5-1 .7z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className, size = 24, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 12 Q12.3 8 12.7 3.3" />
        <path d="M12 12 Q15.6 9.3 19.9 6.9" />
        <path d="M12 12 Q15.2 13.7 19.4 17.4" />
        <path d="M12 12 Q11.5 15.9 11 20.7" />
        <path d="M12 12 Q8.5 14.2 4.3 17" />
        <path d="M12 12 Q8.9 9.5 4.8 6.4" />
      </g>
    </svg>
  );
}

export function Sparkle({ className, size = 24, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c0 0 1 8 4 10-3 2-4 10-4 10-0-0-1-8-4-10 3-2 4-10 4-10z"
        fill={color}
      />
    </svg>
  );
}

export function TapeStrip({ className, width = 80, height = 22, color = DEFAULT_COLOR }: TapeStripProps) {
  const patternId = 'washi-tape-texture';

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="9" height={height} patternTransform="rotate(4)">
          <line x1="0" y1="0" x2="0" y2={height} stroke={color} strokeOpacity="0.18" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill={color} fillOpacity="0.35" />
      <rect x="0" y="0" width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
}

export function DoodleArrow({ className, size = 32, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15.5c5.2 1.6 11.3 2.1 16.9-3.3" />
        <path d="M14 9.4c1.9.7 3.8 1.4 5.9 2.6" />
        <path d="M19.9 12c-.7 2-1 4-1 6" />
      </g>
    </svg>
  );
}

export function BowRibbon({ className, size = 32, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.6 16.2c-1.9-3.5-5.8-5.8-8.7-4.5-2.5 1.1-2.7 4.5-.3 6.5 2.7 2.3 6.6 1.7 9-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.4 16.2c1.9-3.5 5.8-5.8 8.7-4.5 2.5 1.1 2.7 4.5.3 6.5-2.7 2.3-6.6 1.7-9-2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16.2" r="1.7" fill={color} stroke="none" />
    </svg>
  );
}

const FLOWER_PETAL_ANGLES = [0, 72, 144, 216, 288];

export function ScrapbookFlower({ className, size = 24, color = DEFAULT_COLOR }: DecorationProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeWidth="1.3" strokeLinejoin="round">
        {FLOWER_PETAL_ANGLES.map((angle) => (
          <ellipse key={angle} cx="12" cy="6.6" rx="2.1" ry="3.3" transform={`rotate(${angle} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1" />
    </svg>
  );
}

const ScrapbookDecorations = {
  Heart,
  Star,
  Sparkle,
  TapeStrip,
  DoodleArrow,
  BowRibbon,
  ScrapbookFlower,
};

export default ScrapbookDecorations;
