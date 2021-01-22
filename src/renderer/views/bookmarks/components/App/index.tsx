import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { hot } from 'react-hot-loader/root';

import store from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { ThemeProvider } from 'styled-components';
import { SelectionDialog } from '~/renderer/components/SelectionDialog';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import { IBookmark } from '~/interfaces';
import {
  PathView,
  PathItem,
  Dialog,
  DialogTitle,
  DialogButtons,
} from './style';
import {
  ContextMenu,
  ContextMenuItem,
} from '~/renderer/components/ContextMenu';
import { getBookmarkTitle, addImported } from '../../utils';
import { EmptySection } from '../BookmarksSection/style';
import Tree from '../Tree';
import { Bookmark } from '../Bookmark';
import { ipcRenderer } from 'electron';
import { Textfield } from '~/renderer/components/Textfield';
import { Button } from '~/renderer/components/Button';
import {
  ICON_EDIT,
  ICON_TRASH,
  ICON_SAVE,
  ICON_DOWNLOAD,
  ICON_NEW_FOLDER,
} from '~/renderer/constants';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import Langs from '~/langs';

const lang = new Langs();
const word = lang.getWord();

const onScroll = (e: any) => {
  const scrollPos = e.target.scrollTop;
  const scrollMax = e.target.scrollHeight - e.target.clientHeight - 256;

  if (scrollPos >= scrollMax) {
    store.itemsLoaded += store.getDefaultLoaded();
  }
};

const onCancelClick = () => {
  store.selectedItems = [];
};

const onDeleteClick = () => {
  store.deleteSelected();
};

const onRemoveClick = (item: IBookmark) => () => {
  store.removeItems([item._id]);
  store.menuVisible = false;
};

const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  store.search(e.currentTarget.value);
};

const onNewFolderClick = () => {
  store.showDialog('new-folder');
};

const onEditClick = () => {
  store.showDialog('edit');
};

const onRenameClick = () => {
  store.showDialog('rename-folder');
};

const onPathItemClick = (item: IBookmark) => () => {
  if (item) {
    store.currentFolder = item._id;
  } else {
    store.currentFolder = null;
  }
};

const onImportClick = async () => {
  const res = await ipcRenderer.invoke('import-bookmarks');
  addImported(res);
};

const onExportClick = async () => {
  ipcRenderer.invoke('export-bookmarks');
};

const onContextMenuMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onContainerMouseDown = () => {
  store.dialogVisible = false;
};

const onDialogMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onSaveClick = () => {
  if (store.dialogContent === 'new-folder') {
    store.addItem({
      title: store.nameInputRef.current.value,
      isFolder: true,
      parent: store.currentFolder,
      children: [],
    });
  } else if (store.dialogContent === 'edit') {
    store.updateItem(store.currentBookmark._id, {
      title: store.nameInputRef.current.value,
      url: store.urlInputRef.current.value,
    });
  } else if (store.dialogContent === 'rename-folder') {
    store.updateItem(store.currentBookmark._id, {
      title: store.nameInputRef.current.value,
    });
  }

  store.dialogVisible = false;
};

const BookmarksList = observer(() => {
  const items = store.visibleItems;

  return (
    <LeftContent>
      <SelectionDialog
        theme={store.theme}
        visible={store.selectedItems.length > 1}
        amount={store.selectedItems.length}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}
      />
      <PathView>
        {store.path.map((item) => (
          <PathItem onClick={onPathItemClick(item)} key={item._id}>
            {getBookmarkTitle(item)}
          </PathItem>
        ))}
      </PathView>
      {!!items.length && (
        <EmptySection>
          {items.map((data) => (
            <Bookmark data={data} key={data._id} />
          ))}
        </EmptySection>
      )}
    </LeftContent>
  );
});

export default hot(
  observer(() => {
    let dialogTitle = word.bookmarks.btn.newFolder;

    if (store.dialogContent === 'edit') {
      dialogTitle = word.bookmarks.titles.edit;
    } else if (store.dialogContent === 'rename-folder') {
      dialogTitle = word.bookmarks.titles.rename;
    }

    return (
      <ThemeProvider theme={{ ...store.theme }}>
        <Container
          onMouseDown={onContainerMouseDown}
          darken={store.dialogVisible}
        >
          <WebUIStyle />
          <GlobalNavigationDrawer></GlobalNavigationDrawer>
          <NavigationDrawer
            title={word.bookmarks.titles.index}
            search
            onSearchInput={onInput}
          >
            <Tree />
            <div style={{ flex: 1 }} />
            <NavigationDrawer.Item
              icon={ICON_NEW_FOLDER}
              onClick={onNewFolderClick}
            >
              {word.bookmarks.btn.newFolder}
            </NavigationDrawer.Item>
            <NavigationDrawer.Item icon={ICON_DOWNLOAD} onClick={onImportClick}>
              {word.bookmarks.btn.import}
            </NavigationDrawer.Item>
            <NavigationDrawer.Item icon={ICON_SAVE} onClick={onExportClick}>
              {word.bookmarks.btn.export}
            </NavigationDrawer.Item>
          </NavigationDrawer>
          <ContextMenu
            onMouseDown={onContextMenuMouseDown}
            style={{
              top: store.menuTop,
              left: store.menuLeft,
            }}
            visible={store.menuVisible}
          >
            {store.currentBookmark && !store.currentBookmark.isFolder && (
              <ContextMenuItem onClick={onEditClick} icon={ICON_EDIT}>
                {word.bookmarks.btn.edit}
              </ContextMenuItem>
            )}
            {store.currentBookmark && store.currentBookmark.isFolder && (
              <ContextMenuItem onClick={onRenameClick} icon={ICON_EDIT}>
                {word.bookmarks.btn.rename}
              </ContextMenuItem>
            )}
            <ContextMenuItem
              onClick={onRemoveClick(store.currentBookmark)}
              icon={ICON_TRASH}
            >
              {word.bookmarks.btn.delete}
            </ContextMenuItem>
          </ContextMenu>
          <Content onScroll={onScroll}>
            <BookmarksList />
          </Content>
        </Container>
        <Dialog onMouseDown={onDialogMouseDown} visible={store.dialogVisible}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Textfield
            style={{ width: '100%' }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.nameInputRef}
            label="Name"
          ></Textfield>

          <Textfield
            style={{
              width: '100%',
              marginTop: 16,
              display: store.dialogContent === 'edit' ? 'block' : 'none',
            }}
            dark={store.theme['dialog.lightForeground']}
            ref={store.urlInputRef}
            label="URL"
          ></Textfield>

          <DialogButtons>
            <Button
              onClick={() => (store.dialogVisible = false)}
              background={
                store.theme['dialog.lightForeground']
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.08)'
              }
              foreground={
                store.theme['dialog.lightForeground'] ? 'white' : 'black'
              }
            >
              {word.bookmarks.btn.cancel}
            </Button>
            <Button onClick={onSaveClick} style={{ marginLeft: 8 }}>
              {word.bookmarks.btn.save}
            </Button>
          </DialogButtons>
          <div style={{ clear: 'both' }}></div>
        </Dialog>
      </ThemeProvider>
    );
  }),
);
