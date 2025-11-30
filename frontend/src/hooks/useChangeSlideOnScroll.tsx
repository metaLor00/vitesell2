'use client';
import { type UseEmblaCarouselType } from 'embla-carousel-react';

type CarouselApi = UseEmblaCarouselType[1];
import { useEffect, useState } from 'react';

const useChangeSlideOnScroll = (
  emblaApi: CarouselApi,
  threshold: number,
  rootMargin = '0px',
  hasChangeSlideOnScroll: boolean | undefined,
) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        rootMargin: rootMargin,
      },
    );
    if (emblaApi && hasChangeSlideOnScroll) {
      observer.observe(emblaApi.rootNode());
      const slides = emblaApi.slideNodes().length;
      const middleSlide = Math.floor(slides / 2);
      if (isVisible) {
        emblaApi.scrollTo(middleSlide);
      } else {
        emblaApi.scrollTo(0);
      }
    }
  }, [emblaApi, threshold, rootMargin, isVisible, hasChangeSlideOnScroll]);

  return isVisible;
};
export default useChangeSlideOnScroll;
