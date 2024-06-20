import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import styles from './ProductCarousel.module.scss';
import { useSelectedSnapDisplay } from '@/hooks/useSelectedSnapDisplay';
import Share from '@/assets/svgs/btn-share.svg';

interface ProductCarouselProps {
  images: string;
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  const items = images.split(',');

  return (
    <div className={styles.container} ref={emblaRef}>
      <div className={styles.carousel}>
        {items.map((item, index) => (
          <div key={index} className={styles.slide}>
            <Image src={item} alt={'productImages'} fill />
          </div>
        ))}
      </div>
      <div className={styles.snap}>
        {selectedSnap + 1} / {snapCount}
      </div>
      <button type="button" className={styles.share}>
        <Share width={40} height={40} viewBox="0 0 44 44" />
      </button>
    </div>
  );
}
