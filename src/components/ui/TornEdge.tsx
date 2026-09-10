import { cn } from '@/lib/utils';

export interface TornEdgeProps {
  position: 'top' | 'bottom';
  color?: string;
  className?: string;
}

/**
 * 16 points spanning the 1440-wide viewBox with irregular, hand-torn
 * jitter — straight segments (not curves) so the tear reads as ripped
 * paper rather than a smooth wave.
 */
const TORN_POINTS: [number, number][] = [
  [0, 48],
  [96, 58],
  [192, 44],
  [288, 56],
  [384, 40],
  [480, 60],
  [576, 42],
  [672, 54],
  [768, 46],
  [864, 58],
  [960, 44],
  [1056, 56],
  [1152, 40],
  [1248, 58],
  [1344, 44],
  [1440, 52],
];

function buildTornPath() {
  const last = TORN_POINTS[TORN_POINTS.length - 1];
  const rest = TORN_POINTS.slice(0, -1).reverse();
  const jaggedLine = rest.map(([x, y]) => `L${x},${y}`).join(' ');

  return `M0,0 L1440,0 L${last[0]},${last[1]} ${jaggedLine} Z`;
}

const TORN_PATH = buildTornPath();

export default function TornEdge({ position, color = '#FFF8F7', className }: TornEdgeProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 h-[60px] overflow-hidden leading-[0]',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        width="100%"
        height="60"
        preserveAspectRatio="none"
        style={position === 'top' ? { transform: 'scaleY(-1)' } : undefined}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={TORN_PATH} fill={color} />
      </svg>
    </div>
  );
}
