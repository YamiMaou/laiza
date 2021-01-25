import { IBookmark } from '~/interfaces';
import store from '../store';
import Langs from '~/langs';

const lang = new Langs();
const word = lang.getWord();

export const getBookmarkTitle = (item: IBookmark) => {
  if (!item.static) return item.title;

  if (item.static === 'main') {
    return word.bookmarks.titles.bar;
  }

  if (item.static === 'mobile') {
    return word.bookmarks.titles.mobile;
  }

  if (item.static === 'other') {
    return word.bookmarks.titles.others;
  }

  return '';
};

export const addImported = async (arr: any[], parent: IBookmark = null) => {
  let order = 0;

  for (const item of arr) {
    if (item.nsRoot) {
      let folder: IBookmark = null;

      if (item.nsRoot === 'toolbar') {
        folder = store.list.find((x) => x.static === 'main');
      } else {
        folder = store.list.find((x) => x.static === 'other');
      }

      if (folder) {
        addImported(item.children, folder);
      }

      return;
    }

    const bookmark = await store.addItem({
      isFolder: item.type === 'folder',
      title: item.title,
      url: item.url,
      parent: parent && parent._id,
      children: [],
      favicon: item.icon,
      order,
    });

    if (parent) {
      parent.children.push(bookmark._id);
    }

    if (bookmark.isFolder) {
      addImported(item.children, bookmark);
    }

    order++;
  }
};
