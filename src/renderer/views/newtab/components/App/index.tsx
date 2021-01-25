import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { hot } from 'react-hot-loader/root';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper, Content, IconItem, Menu, Image, RightBar } from './style';
import { TopSites } from '../TopSites';
import { News } from '../News';
import { Preferences } from '../Preferences';
import {
  ICON_TUNE,
  ICON_SETTINGS,
  ICON_HISTORY,
  ICON_BOOKMARKS,
  ICON_DOWNLOAD,
  ICON_EXTENSIONS,
} from '~/renderer/constants/icons';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { getWebUIURL } from '~/common/webui';

import Langs from '~/langs';
import { Input } from '~/renderer/components/NavigationDrawer/style';
import { InputContainer } from '~/renderer/views/app/components/AddressBar/style';

import { AddressBarContainer } from '~/renderer/views/app/components/AddressBarContainer';

const langs = new Langs();
const words = langs.getWord();

window.addEventListener('mousedown', () => {
  store.dashboardSettingsVisible = false;
});

const onIconClick = (name: string) => () => {
  window.location.href = getWebUIURL(name);
};

const onTuneClick = () => {
  store.dashboardSettingsVisible = !store.dashboardSettingsVisible;
};

const onRefreshClick = () => {
  store.image = '';
  setTimeout(() => {
    localStorage.setItem('imageDate', '');
    store.loadImage();
  }, 50);
};

export default hot(
  observer(() => {
    return (
      <ThemeProvider theme={{ ...store.theme }}>
        <div>
          <WebUIStyle />

          <Preferences />

          <Wrapper fullSize={store.fullSizeImage}>
            <Image src={store.imageVisible ? store.image : ''}></Image>
            <Content>
              <img
                width="250px"
                style={{ margin: 'auto' }}
                src="https://services.yamitec.com/public/assets/images/logo.png"
              />

              <div
                style={{
                  display: 'none',
                  width: '98%',
                  height: 55,
                  border: '1px solid #dedede',
                  borderRadius: 10,
                  color: '#3333',
                  padding: '5px 15px',
                  background: 'rgba(255,255,255,0.1)',
                  textAlign: 'center',
                }}
              >
                <Input placeholder={words.navigation.addrPlaceholder}></Input>
              </div>
              {store.topSitesVisible && <TopSites></TopSites>}
            </Content>

            <RightBar>
              <IconItem
                imageSet={store.imageVisible}
                title={words.tabs.dashboardSettings}
                icon={ICON_TUNE}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={onTuneClick}
              ></IconItem>
            </RightBar>
            {store.quickMenuVisible && (
              <Menu>
                <IconItem
                  imageSet={store.imageVisible}
                  title={words.menu.settings}
                  icon={ICON_SETTINGS}
                  onClick={onIconClick('settings')}
                ></IconItem>
                <IconItem
                  imageSet={store.imageVisible}
                  title={words.menu.history}
                  icon={ICON_HISTORY}
                  onClick={onIconClick('history')}
                ></IconItem>
                <IconItem
                  imageSet={store.imageVisible}
                  title={words.menu.bookmarks}
                  icon={ICON_BOOKMARKS}
                  onClick={onIconClick('bookmarks')}
                ></IconItem>
                {/* <IconItem
                  imageSet={store.imageVisible}
                  title={words.menu.downloads}
                  icon={ICON_DOWNLOAD}
                  onClick={onIconClick('downloads')}
                ></IconItem>
                <IconItem
                  imageSet={store.imageVisible}
                  title={words.menu.extensions}
                  icon={ICON_EXTENSIONS}
                  onClick={onIconClick('extensions')}
                ></IconItem> */}
              </Menu>
            )}
          </Wrapper>
          {store.newsBehavior !== 'hidden' && (
            <Content>
              <News></News>
            </Content>
          )}
        </div>
      </ThemeProvider>
    );
  }),
);
