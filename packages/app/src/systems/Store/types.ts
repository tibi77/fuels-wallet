import type { StoreClass } from '@fuel-wallet/xstore';

import type { AccountsMachine } from '../Account';
import type { NetworksMachine } from '../Network';
import type { OverlayMachine } from '../Overlay';
import type { UnlockMachine } from '../Unlock';

export enum Services {
  accounts = 'accounts',
  networks = 'networks',
  overlay = 'overlay',
  unlock = 'unlock',
}

export type StoreMachines = {
  accounts: AccountsMachine;
  networks: NetworksMachine;
  overlay: OverlayMachine;
  unlock: UnlockMachine;
};

export type Store = StoreClass<StoreMachines>;
