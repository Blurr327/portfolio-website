"use client";
import { useState, useEffect, CSSProperties, useCallback } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import clsx from "clsx";

interface CarouselProps {
  images: string[];
  className?: string;
  mobileHeight?: number;
  desktopHeight?: number;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

const Carousel = ({
  images,
  className,
  mobileHeight = 250,
  desktopHeight = 500,
  autoScroll = undefined,
  autoScrollInterval = 4000,
}: Readonly<CarouselProps>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle Next Slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [setCurrentIndex, images.length]);

  // Handle Previous Slide
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [setCurrentIndex, images.length]);

  // Handle Direct Slide Navigation
  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  useEffect(() => {
    const interval = setInterval(goToNext, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, goToNext]);

  return (
    <div className={clsx(className, "relative w-full max-w-4xl mx-auto")}>
      {/* Carousel Container */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative min-w-full h-[--mobile-height] md:h-[--desktop-height]`}
              style={
                {
                  "--desktop-height": `${desktopHeight}px`,
                  "--mobile-height": `${mobileHeight}px`,
                } as CSSProperties
              }
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                className={
                  "object-cover h-full w-full rounded-3xl flex justify-center items-center"
                }
                height="100"
                width="200"
              />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full border bg-blue-50"
        >
          <ChevronLeftIcon className="md:w-2 md:h-2" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full border bg-blue-50"
        >
          <ChevronRightIcon className="md:w-2 md:h-2" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              "w-3 h-3 rounded-full",
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            )}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
