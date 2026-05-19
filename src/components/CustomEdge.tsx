import { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps, useReactFlow } from '@xyflow/react';
import { Unplug } from 'lucide-react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main visible edge line */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        interactionWidth={30}
      />

      {/* Invisible wide hitbox for easier hover targeting */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={30}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? '1' : '0.8',
            transition: 'opacity 0.18s ease, scale 0.18s ease',
          }}
          className="z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Liquid glass disconnect pill */}
          <button
            onClick={(e) => { e.stopPropagation(); onEdgeClick(); }}
            className="nodrag nopan relative flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 overflow-hidden select-none group"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(239,68,68,0.12) 50%, rgba(185,28,28,0.06) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(239,68,68,0.35)',
              boxShadow: '0 0 0 1px rgba(239,68,68,0.08), 0 8px 32px rgba(239,68,68,0.25), 0 2px 8px rgba(239,68,68,0.15), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 1px rgba(239,68,68,0.08)',
            }}
            title="Disconnect"
          >
            {/* Inner light shimmer */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
            <Unplug
              className="relative z-10 w-3 h-3 text-red-600 group-hover:text-red-300 group-hover:rotate-12 transition-all duration-200"
              strokeWidth={2.5}
            />
            <span className="relative z-10 text-[11px] font-semibold text-red-600 group-hover:text-red-300 tracking-wide transition-colors duration-200">
              Disconnect
            </span>
          </button>
        </div>
      </EdgeLabelRenderer>
    </g>
  );
}
