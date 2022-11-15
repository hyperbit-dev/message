import { sign, verify } from '../src';

describe('message sign and verify', () => {
  const privateKeyWIF = 'QVD3x1RPiWPvyxbTsfxVwaYLyeBZrQvjhZ2aZJUsbuRgsEAGpNQ2';
  const message = 'Hello World';
  const signature =
    'H+6akpUg+O3bti+VNKA6odVnKhzlkZ0d2BOhwrp5T+i1XTPTBlLrsaXtBkO1O8cpe0ingWoh31Lpxf2S5jgvf2o=';
  const address = 'DGG6AicS4Qg8Y3UFtcuwJqbuRZ3Q7WtYXv';

  it('should sign a message for bitcoin', () => {
    const result = sign({
      privateKey: privateKeyWIF,
      message,
    });

    expect(result).toEqual(signature);
  });

  it('should verify a message for bitcoin', () => {
    const result = verify({
      address,
      message,
      signature,
    });

    expect(result).toBe(true);
  });
});
