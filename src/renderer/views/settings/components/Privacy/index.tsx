import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { onSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';
import Lang from '~/langs';

const langs = new Lang();
const word = langs.getWord();

const onClearBrowsingData = () => {
  store.dialogContent = 'privacy';
};

const DoNotTrackToggle = observer(() => {
  const { doNotTrack } = store.settings;

  return (
    <Row onClick={onSwitchChange('doNotTrack')}>
      <Title>{word.privacy.titles.doNotTrack}</Title>
      <Control>
        <Switch value={doNotTrack} />
      </Control>
    </Row>
  );
});

export const Privacy = () => {
  return (
    <>
      <Header>{word.privacy.headers.privacy}</Header>
      <Button
        type="outlined"
        foreground={BLUE_500}
        onClick={onClearBrowsingData}
      >
        {word.privacy.btn.clearData}
      </Button>
      <DoNotTrackToggle />
    </>
  );
};
