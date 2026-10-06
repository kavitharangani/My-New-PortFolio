"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Respects the user's OS "reduce motion" setting for every Framer Motion animation.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
