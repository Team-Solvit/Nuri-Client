"use client";

import React from "react";
import Image from "next/image";
import Arrow from "@/assets/post/arrow-right.svg";
import * as S from "../style";

interface MediaSliderProps {
  images: string[];
  current: number;
  fitMode: "cover" | "contain";
  onPrev: () => void;
  onNext: () => void;
  onImageLoadForFit: (i: number, ratio: number) => void;
}

export default function MediaSlider({ images, current, fitMode, onPrev, onNext, onImageLoadForFit }: MediaSliderProps) {
  const max = images.length - 1;
  return (
    <S.SliderWrapper>
      {current > 0 && (
        <S.ArrowBtn left onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover", transform: "rotate(180deg)" }} />
        </S.ArrowBtn>
      )}
      <S.SliderTrack index={current} count={images.length}>
        {images.map((src, i) => (
          <S.Slide key={i}>
            <Image
              src={src.startsWith("http") ? src : `https://cdn.solvit-nuri.com/file/${src}`}
              alt={`slide-${i}`}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 640px"
              onLoadingComplete={(img) => {
                if (i !== current) return;
                const ratio = img.naturalWidth / img.naturalHeight;
                onImageLoadForFit(i, ratio);
              }}
              style={{ objectFit: "contain", backgroundColor: "#000", transition: "object-fit 0.25s" }}
            />
          </S.Slide>
        ))}
      </S.SliderTrack>
      {current < max && (
        <S.ArrowBtn onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <Image src={Arrow} alt="arrow" fill style={{ objectFit: "cover" }} />
        </S.ArrowBtn>
      )}
    </S.SliderWrapper>
  );
}
