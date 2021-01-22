import * as React from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';
import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import { TopBarVariant } from '~/interfaces';
import Lang from '~/langs';

const langs = new Lang();
const word = langs.getWord();

const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const ThemeVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <Row>
      <Title>{word.appeareance.themeVariant.title}</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
        >
          <Dropdown.Item value="auto">
            {word.appeareance.themeVariant.items.auto}
          </Dropdown.Item>
          <Dropdown.Item value="laiza-light">
            {word.appeareance.themeVariant.items.light}
          </Dropdown.Item>
          <Dropdown.Item value="laiza-dark">
            {word.appeareance.themeVariant.items.dark}
          </Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const onTopBarChange = (value: TopBarVariant) => {
  store.settings.topBarVariant = value;
  store.save();
};

const TopBarVariant = observer(() => {
  return (
    <Row>
      <Title>{word.appeareance.topBar.title}</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.topBarVariant}
          onChange={onTopBarChange}
        >
          <Dropdown.Item value="default">
            {word.appeareance.topBar.default}
          </Dropdown.Item>
          <Dropdown.Item value="compact">
            {word.appeareance.topBar.compact}
          </Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const WarnQuit = observer(() => {
  const { warnOnQuit } = store.settings;

  return (
    <Row onClick={onSwitchChange('warnOnQuit')}>
      <Title>{word.appeareance.titles.warnOnQuit}</Title>
      <Control>
        <Switch value={warnOnQuit} />
      </Control>
    </Row>
  );
});

const MenuAnimations = observer(() => {
  const { animations } = store.settings;

  return (
    <Row onClick={onSwitchChange('animations')}>
      <Title>{word.appeareance.titles.menuAnimations}</Title>
      <Control>
        <Switch value={animations} />
      </Control>
    </Row>
  );
});

const BookmarksBar = observer(() => {
  const { bookmarksBar } = store.settings;

  return (
    <Row onClick={onSwitchChange('bookmarksBar')}>
      <Title>{word.appeareance.titles.bookmarksBar}</Title>
      <Control>
        <Switch value={bookmarksBar} />
      </Control>
    </Row>
  );
});

export const Appearance = observer(() => {
  return (
    <>
      <Header>{word.settings.appearance}</Header>
      {/* <MenuAnimations /> */}
      <BookmarksBar />
      <WarnQuit />
      <ThemeVariant />
      <TopBarVariant />
    </>
  );
});
