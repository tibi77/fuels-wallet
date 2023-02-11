import type { StoreClass } from '@fuel-wallet/xstore';

import type { AccountsMachine } from '../Account';
import type {
  TransactionRequestMachine,
  MessageRequestMachine,
  ConnectRequestMachine,
} from '../DApp';
import type { NetworksMachine } from '../Network';
import type { OverlayMachine } from '../Overlay';
import type { UnlockMachine } from '../Unlock';

export enum Services {
  accounts = 'accounts',
  networks = 'networks',
  overlay = 'overlay',
  unlock = 'unlock',
  txRequest = 'txRequest',
  msgRequest = 'msgRequest',
  connectRequest = 'connectRequest',
}

export type StoreMachines = {
  accounts: AccountsMachine;
  networks: NetworksMachine;
  overlay: OverlayMachine;
  unlock: UnlockMachine;
  txRequest: TransactionRequestMachine;
  msgRequest: MessageRequestMachine;
  connectRequest: ConnectRequestMachine;
};

export type Store = StoreClass<StoreMachines>;
