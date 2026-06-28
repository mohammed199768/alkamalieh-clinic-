"use client";
import React, { type CSSProperties } from "react";
import type { MaskPosition, ImageSize } from "./maskHooks";

type Props = {
  bgImage: string;
  position?: MaskPosition;
  natural?: ImageSize;
  /** Optional horizontal focal (0=start of image, 1=end). Defaults to centered. */
  focalX?: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLDivElement | null) => void;
  style?: CSSProperties;
};

/**
 * Renders a card as a precise window into ONE shared section image, using true
 * object-cover math so the image always fills the whole section (never blank):
 *
 *   scale   = max(sw/nw, sh/nh)
 *   renderW = nw * scale,  renderH = nh * scale
 *   offsetX = (sw - renderW)/2 (or focal-shifted), offsetY = (sh - renderH)/2
 *   background-size:     renderW x renderH
 *   background-position: (offsetX - cardX) (offsetY - cardY)
 *
 * Falls back to `cover / center` until measurements are ready.
 */
export default function MaskedCard({
  bgImage,
  position,
  natural,
  focalX,
  className = "",
  children,
  cardRef,
  style,
}: Props) {
  let bg: CSSProperties;
  const ready = position && natural && natural.w > 0 && natural.h > 0 && position.sw > 0 && position.sh > 0;

  if (ready && position && natural) {
    const scale = Math.max(position.sw / natural.w, position.sh / natural.h);
    const renderW = natural.w * scale;
    const renderH = natural.h * scale;
    const overflowX = renderW - position.sw; // >= 0
    const offsetX = focalX != null && overflowX > 0 ? -overflowX * focalX : (position.sw - renderW) / 2;
    const offsetY = (position.sh - renderH) / 2;
    bg = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: `${renderW}px ${renderH}px`,
      backgroundPosition: `${offsetX - position.x}px ${offsetY - position.y}px`,
      backgroundRepeat: "no-repeat",
    };
  } else {
    bg = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return (
    <div ref={cardRef} className={className} style={{ ...bg, ...style }}>
      {children}
    </div>
  );
}
