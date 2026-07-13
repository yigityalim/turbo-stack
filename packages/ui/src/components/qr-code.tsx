"use client";

import { cn } from "@repo/ui/lib/utils";
import { QRCodeSVG } from "qrcode.react";

export interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

/** A brand-styled QR code in a white card (navy modules on white). */
export function QRCode({ value, size = 168, className }: QRCodeProps) {
  return (
    <div className={cn("rounded-2xl bg-white p-5 shadow-lg", className)}>
      <QRCodeSVG value={value} size={size} bgColor="#ffffff" fgColor="#1e2d5a" level="M" />
    </div>
  );
}
