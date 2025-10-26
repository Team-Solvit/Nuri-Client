"use client";

import { useEffect, useState } from "react";

export function useMediaSlider(images: string[]) {
  const [current, setCurrent] = useState(0);
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover");
  const max = images.length - 1;

  useEffect(() => {
    setCurrent(0);
  }, [images.join("|")]);

  useEffect(() => {
    setFitMode("cover");
  }, [current, images.join("|")]);

  const handleSlide = (direction: "next" | "prev") =>
    setCurrent((prev) => (direction === "next" ? (prev < max ? prev + 1 : 0) : prev > 0 ? prev - 1 : max));

  const handleImageLoadForFit = (_: number, ratio: number) => {
    if (ratio > 1.35 || ratio < 0.74) setFitMode("contain");
    else setFitMode("cover");
  };

  return { current, fitMode, setFitMode, handleSlide, handleImageLoadForFit } as const;
}
