import { graphql } from 'msw';
import { interpret } from 'xstate';
import { waitFor } from 'xstate/lib/waitFor';

import type { ChainInfoMachineService } from './nodeInfoMachine';
import { chainInfoMachine } from './nodeInfoMachine';

import { VITE_FUEL_PROVIDER_URL } from '~/config';
import { mockServer } from '~/mocks/server';

mockServer([
  graphql.query('getNodeInfo', (_req, res, ctx) => {
    return res(
      ctx.data({
        nodeInfo: {
          nodeVersions: '0.17.3',
        },
      })
    );
  }),
]);

describe('chainInfoMachine', () => {
  let service: ChainInfoMachineService;

  beforeEach(async () => {
    service = interpret(chainInfoMachine.withContext({})).start();
  });

  afterEach(() => {
    service.stop();
  });

  it('should fetch chainInfo', async () => {
    await waitFor(service, (state) => state.matches('idle'));

    service.send('FETCH_CHAIN_INFO', {
      input: { providerUrl: VITE_FUEL_PROVIDER_URL },
    });

    await waitFor(service, (state) => state.matches('fetchingChainInfo'));
    await waitFor(service, (state) => state.matches('idle'));
    await waitFor(service, (state) => Boolean(state.context.chainInfo));
  });
});
