export type Sign = {
  message: string;
  privateKey: string | Buffer;
  compressed?: boolean;
  messagePrefix?: string;
};

export type Verify = {
  message: string;
  address: string;
  signature: string;
  messagePrefix?: string;
};
