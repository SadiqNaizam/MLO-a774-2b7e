import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button"; // For potential Prev/Next buttons
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  slides: React.ReactNode[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  showArrows?: boolean;
  slideClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  showArrows = true,
  slideClassName = "flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 p-2"
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <p className="text-center text-neutral-500">No items to display in carousel.</p>;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slideContent, index) => (
            <div className={cn("embla__slide", slideClassName)} key={index}>
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-800" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5 text-neutral-800" />
          </Button>
        </>
      )}
      {/* Add Dots if needed, emblaApi.scrollSnapList() and emblaApi.selectedScrollSnap() */}
    </div>
  );
}

export default Carousel;