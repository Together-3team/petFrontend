import CardSliderHot from '@/components/common/Card/CardSlider/Hot';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import CardSliderSimilar from '@/components/common/Card/CardSlider/Similar';

export default function CardSliderPage() {
  return (
    <div>
      <CardSliderRecommended title="이런 상품 찾고 있나요?" />
      <CardSliderHot />
      <CardSliderSimilar />
    </div>
  );
}
