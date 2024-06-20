import CardSliderRoot from '@/components/common/Card/CardSlider/Base/Root';
import CardSliderList from '@/components/common/Card/CardSlider/Base/List';
import CardSliderHeader from '@/components/common/Card/CardSlider/Base/Header';
import CardSliderTitle from '@/components/common/Card/CardSlider/Base/Title';
import CardSliderDescription from '@/components/common/Card/CardSlider/Base/Description';
import CardSliderItem from '@/components/common/Card/CardSlider/Base/Item';

const CardSlider = Object.assign(
  {},
  {
    Root: CardSliderRoot,
    Header: CardSliderHeader,
    Title: CardSliderTitle,
    Description: CardSliderDescription,
    List: CardSliderList,
    Item: CardSliderItem,
  }
);

export default CardSlider;
