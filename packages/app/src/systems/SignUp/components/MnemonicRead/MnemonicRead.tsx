import { cssObj } from '@fuel-ui/css';
import { Stack, Form, Checkbox, Flex, Button, Alert } from '@fuel-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '../Header';

import { ImageLoader, Mnemonic, relativeUrl } from '~/systems/Core';

export type MnemonicReadProps = {
  words?: string[];
  onNext: () => void;
  onCancel: () => void;
};

export function MnemonicRead({ words, onCancel, onNext }: MnemonicReadProps) {
  const { t } = useTranslation();
  const [isSavedChecked, setSavedChecked] = useState(false);

  return (
    <Stack gap="$6" align="center">
      <ImageLoader
        src={relativeUrl('/signup-illustration-1.svg')}
        width={129}
        height={116}
        alt="Showing your Mnemonic"
      />
      <Header
        title={t('singup.showMnemonic.title')}
        subtitle={t('singup.showMnemonic.subtitle')}
      />
      <Stack css={styles.content} gap="$4">
        <Mnemonic value={words} type="read" />
        <Alert status="warning">
          <Form.Control css={{ flexDirection: 'row' }}>
            <Checkbox
              id="confirmSaved"
              aria-label="Confirm Saved"
              checked={isSavedChecked}
              onCheckedChange={(e) => {
                setSavedChecked(e as boolean);
              }}
            />
            <Form.Label htmlFor="confirmSaved">
              {t('singup.showMnemonic.confirmBackup')}
            </Form.Label>
          </Form.Control>
        </Alert>
      </Stack>
      <Flex gap="$4">
        <Button
          color="gray"
          variant="ghost"
          css={{ width: 130 }}
          onPress={onCancel}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          color="accent"
          css={{ width: 130 }}
          onPress={onNext}
          isDisabled={!isSavedChecked}
        >
          {t('actions.next')}
        </Button>
      </Flex>
    </Stack>
  );
}

const styles = {
  content: cssObj({
    width: 400,

    '.fuel_alert--icon': {
      display: 'none',
    },
    '.fuel_alert--content': {
      gap: '$4',
    },
    '.fuel_checkbox:focus-within::after': {
      borderColor: '$yellow5 !important',
    },
  }),
};
