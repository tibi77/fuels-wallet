import { Button, Flex, FuelLogo, Stack } from '@fuel-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components';

import { Layout, Pages } from '~/systems/Core';

export function WelcomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout title={t('singup.welcome.head.title')} isPublic>
      <Stack gap="$6" align="center">
        <FuelLogo size={130} css={{ transform: 'translateY(10px)' }} />
        <Header title={t('singup.welcome.title')} />
        <Flex direction="column" gap="$2">
          <Button
            color="accent"
            onPress={() => navigate(Pages.signUpCreateWallet())}
          >
            {t('singup.welcome.actions.create')}
          </Button>
          <Button
            color="gray"
            variant="ghost"
            onPress={() => navigate(Pages.signUpRecoverWallet())}
          >
            {t('singup.welcome.actions.import')}
          </Button>
        </Flex>
      </Stack>
    </Layout>
  );
}
