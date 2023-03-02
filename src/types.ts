import { Network, TestNetwork, Versions } from '@hyperbitjs/chains';

export type Sign = {
  message: string;
  privateKey: string | Buffer;
  compressed?: boolean;
  messagePrefix?: string;
  versions?: Pick<Versions, 'private' | 'public'>;
  network?: Network | TestNetwork;
};

export type Verify = {
  message: string;
  address: string;
  signature: string;
  messagePrefix?: string;
  network?: Network | TestNetwork;
};
