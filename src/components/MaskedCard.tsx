import React, { forwardRef, ReactNode } from 'react';
import { MaskOffset } from '../hooks/useMaskPositions';

export interface MaskedCardProps {
  offset?: MaskOffset;
  children?: ReactNode;
  className?: string;
  bgMedia?: ReactNode;
  bgClassName?: string;
  onClick?: () => void;
}

export const MaskedCard = forwardRef<HTMLDivElement, MaskedCardProps>(
  ({ offset, children, className = '', bgMedia, bgClassName = '', onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`relative overflow-hidden rounded-[14px] sm:rounded-[18px] border border-white/[0.12] bg-[#0c0d10]/80 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md ${className}`}
      >
        {/* Continuous Masked Background Layer */}
        {offset && offset.containerWidth > 0 && (
          <div
            className={`pointer-events-none absolute select-none ${bgClassName}`}
            style={{
              left: `${-offset.x}px`,
              top: `${-offset.y}px`,
              width: `${offset.containerWidth}px`,
              height: `${offset.containerHeight}px`,
            }}
          >
            {bgMedia || (
              <div className="w-full h-full bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02] bg-subtle-grain" />
            )}
          </div>
        )}

        {/* Card Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);

MaskedCard.displayName = 'MaskedCard';
