import CardSliderHot from '@/components/common/Card/CardSlider/Hot';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';

export default function CardSliderPage() {
  return (
    <div>
      <CardSliderRecommended title="이런 상품 찾고 있나요?" />
      <CardSliderHot />
    </div>
  );
}
