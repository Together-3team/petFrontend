import HeaderBox from './Box';
import HeaderCenter from './Center';
import HeaderLeft from './Left';
import HeaderRight from './Right';
import HeaderRoot from './Root';

/*
  페이지마다 Header가 너무 다 다르게 생겨서 합성 컴포넌트 패턴으로 구현했습니다.
  합성 컴포넌트로 구현해서 사용이 조금 불편할 수 있는 점 양해 부탁드립니다.

  Box 안에 넣고 Left, Center, Right로 원하는 위치에 고정할 수 있습니다.

  홈 페이지처럼 Header에 다른 복합적인 것이 들어가는 경우 Box를 사용하지 않고 Root안에 원하는 컴포넌트를 추가하시면 됩니다.

  사용)
  [찜 페이지]
  export default function Example() {
    return (
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <p>찜</p>
          </Header.Left>
          <Header.Right>
            <CartButton />
          </Header.Right>
        </Header.Box>
      </Header.Root>
    );
  }

  [홈 페이지]
  export default function Example() {
    return (
      <Header.Root>
        <Header.Box>
          <Header.Left>
            로고
          </Header.Left>
          <Header.Right>
            <SearchButton />
            <CartButton />
          </Header.Right>
        </Header.Box>
        <NavTop />
      </Header.Root>
    );
  }
*/

const Header = Object.assign(
  {},
  {
    Root: HeaderRoot,
    Box: HeaderBox,
    Left: HeaderLeft,
    Center: HeaderCenter,
    Right: HeaderRight,
  }
);

export default Header;
