import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { hot } from 'react-hot-loader/root';

import store, { QuickRange } from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { ThemeProvider } from 'styled-components';
import { SelectionDialog } from '~/renderer/components/SelectionDialog';
import { HistorySection } from '../HistorySection';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import {
  ICON_HISTORY,
  ICON_ALL,
  ICON_TODAY,
  ICON_WEEK,
  ICON_CALENDAR,
  ICON_TRASH,
} from '~/renderer/constants';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import Langs from '~/langs';

const langs = new Langs();
const words = langs.getWord();

const onScroll = (e: any) => {
  const scrollPos = e.target.scrollTop;
  const scrollMax = e.target.scrollHeight - e.target.clientHeight - 256;

  if (scrollPos >= scrollMax) {
    store.itemsLoaded += store.getDefaultLoaded();
  }
};

const RangeItem = observer(
  ({
    range,
    children,
    icon,
  }: {
    range: QuickRange;
    children: any;
    icon: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedRange = range)}
      selected={store.selectedRange === range}
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

const onCancelClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.selectedItems = [];
};

const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.deleteSelected();
};

const HistorySections = observer(() => {
  return (
    <LeftContent style={{ margin: '32px 64px' }}>
      <SelectionDialog
        theme={store.theme}
        visible={store.selectedItems.length > 0}
        amount={store.selectedItems.length}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}
      />
      {store.sections.map((data) => (
        <HistorySection data={data} key={data.date.getTime()} />
      ))}
    </LeftContent>
  );
});

const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  store.search(e.currentTarget.value);
};

const onClearClick = () => {
  store.clear();

  // TODO: ipcRenderer.send('clear-browsing-data');
};

export default hot(
  observer(() => {
    return (
      <ThemeProvider theme={{ ...store.theme }}>
        <Container>
          <WebUIStyle />
          <GlobalNavigationDrawer></GlobalNavigationDrawer>
          <NavigationDrawer
            title={words.histories.title}
            search
            onSearchInput={onInput}
          >
            <RangeItem icon={ICON_ALL} range="all">
              {words.histories.rangeItems.all}
            </RangeItem>
            <RangeItem icon={ICON_TODAY} range="today">
              {words.histories.rangeItems.today}
            </RangeItem>
            <RangeItem icon={ICON_HISTORY} range="yesterday">
              {words.histories.rangeItems.yesterday}
            </RangeItem>
            <RangeItem icon={ICON_WEEK} range="last-week">
              {words.histories.rangeItems.lastweek}
            </RangeItem>
            <RangeItem icon={ICON_CALENDAR} range="older">
              {words.histories.rangeItems.older}
            </RangeItem>
            <div style={{ flex: 1 }} />
            <NavigationDrawer.Item icon={ICON_TRASH} onClick={onClearClick}>
              {words.privacy.browsingData.btn}
            </NavigationDrawer.Item>
          </NavigationDrawer>
          <Content onScroll={onScroll}>
            <HistorySections />
          </Content>
        </Container>
      </ThemeProvider>
    );
  }),
);
