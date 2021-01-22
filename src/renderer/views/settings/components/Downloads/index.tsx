import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';
import Lang from '~/langs';

const langs = new Lang();
const word = langs.getWord();

const AskToggle = observer(() => {
  const { downloadsDialog } = store.settings;

  return (
    <Row onClick={onSwitchChange('downloadsDialog')}>
      <Title>{word.downloads.titles.askwheresave}</Title>
      <Control>
        <Switch value={downloadsDialog} />
      </Control>
    </Row>
  );
});

const onChangeClick = () => {
  ipcRenderer.send('downloads-path-change');
};

const Location = observer(() => {
  return (
    <Row>
      <div>
        <Title>{word.downloads.titles.location}</Title>
        <SecondaryText>{store.settings.downloadsPath}</SecondaryText>
      </div>

      <Control>
        <NormalButton onClick={onChangeClick}>
          {word.downloads.btn.change}
        </NormalButton>
      </Control>
    </Row>
  );
});

export const Downloads = () => {
  return (
    <>
      <Header>{word.downloads.headers.downloads}</Header>
      <Location />
      <AskToggle />
    </>
  );
};
