import { cssObj } from '@fuel-ui/css';
import { Box, Button, Flex, Link, Text, Tooltip } from '@fuel-ui/react';

import { useNodeInfo } from '../../hooks';

import { useAccounts } from '~/systems/Account';
import { useNetworks } from '~/systems/Network';

export type HomeActionsProps = {
  isDisabled?: boolean;
  receiveAction?: () => void;
  sendAction?: () => void;
};

export const HomeActions = ({
  isDisabled,
  receiveAction = () => {},
  sendAction = () => {},
}: HomeActionsProps) => {
  const { hasBalance, isLoading } = useAccounts();
  const { selectedNetwork } = useNetworks();
  const { versionCompatible, isLoading: isLoadingNodeInfo } = useNodeInfo(
    selectedNetwork?.url
  );
  const shouldDisableSend =
    isDisabled || !hasBalance || isLoadingNodeInfo || !versionCompatible;

  const sendButton = (
    <Button
      aria-label="Send Button"
      onPress={sendAction}
      isDisabled={shouldDisableSend}
      css={styles.button}
      isLoading={isLoading}
    >
      Send
    </Button>
  );

  return (
    <Box css={styles.root}>
      <Flex css={styles.wrapper}>
        {hasBalance ? (
          sendButton
        ) : (
          <Tooltip content="You don't have balance to send">
            {sendButton}
          </Tooltip>
        )}
        <Button
          isDisabled={isDisabled}
          onPress={receiveAction}
          variant="outlined"
          color="gray"
          css={styles.button}
        >
          Receive
        </Button>
      </Flex>
      {!versionCompatible && (
        <Text fontSize="xs" css={styles.version}>
          The selected network is not compatible with Fuel Wallet {'>'} v0.7.0.{' '}
          <Link
            isExternal
            href="https://github.com/FuelLabs/fuels-wallet/releases/tag/v0.1.0"
          >
            Previous version
          </Link>
        </Text>
      )}
    </Box>
  );
};

const styles = {
  root: cssObj({
    marginBottom: '$6',
  }),
  version: cssObj({
    marginTop: '$2',
    padding: '$0 $8',
    textAlign: 'center',
  }),
  wrapper: cssObj({
    marginTop: '$8',
    flexShrink: 0,
    gap: '$2',
  }),
  button: cssObj({
    borderRadius: 40,
    flex: 1,
    py: '$5',
  }),
};
