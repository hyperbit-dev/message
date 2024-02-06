import {
  MainNet,
  RegTest,
  SimNet,
  TestNet,
  Versions,
} from '@hyperbitjs/chains';

export type Sign = {
  message: string;
  privateKeyWIF?: string | Buffer;
  privateKey?: string | Buffer;
  compressed?: boolean;
  messagePrefix?: string;
  versions?: Pick<Versions, 'private' | 'public'>;
  network?: MainNet | TestNet | RegTest | SimNet;
};

export type Verify = {
  message: string;
  address: string;
  signature: string;
  messagePrefix?: string;
  network?: MainNet | TestNet | RegTest | SimNet;
};
