import { Box } from '@fuel-ui/react';

import { NetworkWarning } from './NetworkWarning';

export default {
  component: NetworkWarning,
  title: 'Home/Components/NetworkWarning',
};

export const Usage = () => (
  <Box>
    <NetworkWarning hidden={false} />
  </Box>
);
