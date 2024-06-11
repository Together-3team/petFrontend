import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import styles from './ProductCarousel.module.scss';
import { useSelectedSnapDisplay } from '@/hooks/useSelectedSnapDisplay';

interface ProductCarouselProps {
  items: {
    src: string;
    alt: string;
  }[];
}

export default function ProductCarousel({ items }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <div className={styles.container} ref={emblaRef}>
      <div className={styles.carousel}>
        {items.map((item, index) => (
          <div key={index} className={styles.slide}>
            <Image src={item.src} alt={item.alt} fill />
          </div>
        ))}
      </div>
      <div className={styles.snap}>
        {selectedSnap + 1} / {snapCount}
      </div>
    </div>
  );
}
