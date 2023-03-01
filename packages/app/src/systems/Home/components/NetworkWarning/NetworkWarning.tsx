import { cssObj } from '@fuel-ui/css';
import { Link, Text } from '@fuel-ui/react';

type NetworkWarningProps = {
  hidden: boolean;
};

export function NetworkWarning({ hidden }: NetworkWarningProps) {
  if (hidden) return null;

  return (
    <Text fontSize="xs" css={styles.root}>
      The selected network is not compatible with Fuel Wallet {'>'} v0.7.0.{' '}
      <Link
        isExternal
        href="https://github.com/FuelLabs/fuels-wallet/releases/tag/v0.1.0"
      >
        Previous version
      </Link>
    </Text>
  );
}

const styles = {
  root: cssObj({
    marginTop: '$2',
    textAlign: 'center',
    width: 240,
  }),
};
