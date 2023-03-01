import { useInterpret, useSelector } from '@xstate/react';
import { useEffect } from 'react';

import type { NodeInfoMachineState } from '../machines/nodeInfoMachine';
import { nodeInfoMachine } from '../machines/nodeInfoMachine';

const selectors = {
  versionCompatible: (state: NodeInfoMachineState) => {
    if (state.context.nodeInfo?.nodeVersion) {
      const [, minor] = state.context.nodeInfo.nodeVersion.split('.');
      return Number(minor) >= 17;
    }
    return true;
  },
  nodeInfo: (state: NodeInfoMachineState) => state.context.nodeInfo,
  loading: (state: NodeInfoMachineState) => state.hasTag('loading'),
};

export function useNodeInfo(providerUrl?: string) {
  const service = useInterpret(() => nodeInfoMachine);
  const { send } = service;
  const versionCompatible = useSelector(service, selectors.versionCompatible);
  const nodeInfo = useSelector(service, selectors.nodeInfo);
  const isLoading = useSelector(service, selectors.loading);

  useEffect(() => {
    if (providerUrl) {
      send('FETCH_NODE_INFO', { input: { providerUrl } });
    }
  }, [providerUrl]);

  return { nodeInfo, versionCompatible, isLoading };
}
