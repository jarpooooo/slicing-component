import Image from "next/image";

import { assets, type AssetName } from "@/lib/assets";
import { cn } from "@/lib/utils";

type AssetIconProps = {
  name: AssetName;
  className?: string;
  /** Leave empty for decorative icons, which are hidden from screen readers. */
  alt?: string;
};

/** Figma-exported icon from /public at its intrinsic size. Decorative by default. */
export function AssetIcon({ name, className, alt = "" }: AssetIconProps) {
  const asset = assets[name];
  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={cn("shrink-0", className)}
    />
  );
}
