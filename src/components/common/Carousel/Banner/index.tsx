import styles from './BannerCarousel.module.scss';

interface BannerCarouselProps {
  items: {
    src: string;
    alt: string;
  }[];
}

export default function BannerCarousel({ items }: BannerCarouselProps) {
  return (
    <>
      <div>BannerCarousel</div>
    </>
  );
}
