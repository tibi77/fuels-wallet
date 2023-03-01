import { cssObj } from '@fuel-ui/css';
import { Box, Button, Flex, Tooltip } from '@fuel-ui/react';

import { useNodeInfo } from '../../hooks';
import { NetworkWarning } from '../NetworkWarning/NetworkWarning';

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
      <NetworkWarning hidden={versionCompatible} />
    </Box>
  );
};

const styles = {
  root: cssObj({
    marginBottom: '$6',
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
