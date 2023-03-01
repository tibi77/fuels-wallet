/* eslint-disable @typescript-eslint/consistent-type-imports */
import { NodeInfo } from 'fuels';
import { assign, createMachine, InterpreterFrom, StateFrom } from 'xstate';

import type { FetchResponse } from '~/systems/Core';
import { FetchMachine } from '~/systems/Core';
import { NetworkInputs, NetworkService } from '~/systems/Network';

type MachineContext = {
  nodeInfo?: NodeInfo;
};

type MachineServices = {
  fetchNodeInfo: {
    data: FetchResponse<NodeInfo>;
  };
};

type MachineEvents = {
  type: 'FETCH_NODE_INFO';
  input: { providerUrl?: string };
};

export const nodeInfoMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./nodeInfoMachine.typegen').Typegen0,
    schema: {
      context: {} as MachineContext,
      services: {} as MachineServices,
      events: {} as MachineEvents,
    },
    id: '(machine)',
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_NODE_INFO: [
            {
              target: 'fetchingNodeInfo',
            },
          ],
        },
      },
      fetchingNodeInfo: {
        tags: ['loading'],
        invoke: {
          src: 'fetchNodeInfo',
          data: {
            input: (_: MachineContext, ev: MachineEvents) => ev.input,
          },
          onDone: [
            {
              target: 'idle',
              cond: FetchMachine.hasError,
            },
            {
              actions: ['assignNodeInfo'],
              target: 'idle',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignNodeInfo: assign({
        nodeInfo: (ctx, ev) => ev.data,
      }),
    },
    services: {
      fetchNodeInfo: FetchMachine.create<
        NetworkInputs['getNodeInfo'],
        NodeInfo
      >({
        showError: true,
        async fetch({ input }) {
          if (!input?.providerUrl) {
            throw new Error('No chain URL');
          }

          return NetworkService.getNodeInfo(input);
        },
      }),
    },
  }
);

export type NodeInfoMachine = typeof nodeInfoMachine;
export type NodeInfoMachineService = InterpreterFrom<NodeInfoMachine>;
export type NodeInfoMachineState = StateFrom<NodeInfoMachine>;
