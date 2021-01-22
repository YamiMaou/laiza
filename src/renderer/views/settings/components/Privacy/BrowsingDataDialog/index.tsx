import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Dialog, Title, Content, Buttons, CloseButton } from '../../Dialog';
import { Button } from '~/renderer/components/Button';
import store from '../../../store';
import Lang from '~/langs';

const langs = new Lang();
const word = langs.getWord();

export default observer(() => {
  return (
    <Dialog visible={store.dialogContent === 'privacy'} style={{ width: 344 }}>
      <Title>{word.privacy.browsingData.title}</Title>
      <Content></Content>
      <Buttons>
        <CloseButton />
        <Button background="transparent" foreground="#3F51B5">
          {word.privacy.browsingData.btn}
        </Button>
      </Buttons>
    </Dialog>
  );
});
