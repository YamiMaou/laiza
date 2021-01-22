import * as React from 'react';

import {
  StyledNavigationDrawer,
  MenuItems,
  Search,
  Input,
  Title,
  Header,
} from './style';
import { NavigationDrawerItem } from './NavigationDrawerItem';
import Langs from '~/langs';

const lang = new Langs();
const word = lang.getWord();

export const NavigationDrawer = ({
  children,
  title,
  search,
  onSearchInput,
  style,
  dense,
}: {
  children?: any;
  title?: string;
  search?: boolean;
  onSearchInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBackClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
  dense?: boolean;
}) => {
  return (
    <StyledNavigationDrawer style={style} dense={dense}>
      {title !== '' && (
        <Header>
          <Title>{title}</Title>
        </Header>
      )}
      {search && (
        <Search>
          <Input
            placeholder={word.settings.search.placeholder}
            onInput={onSearchInput}
          />
        </Search>
      )}
      <MenuItems>{children}</MenuItems>
    </StyledNavigationDrawer>
  );
};

NavigationDrawer.Item = NavigationDrawerItem;
