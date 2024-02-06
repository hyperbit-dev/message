import { rvn } from "@hyperbitjs/chains";
import { describe, expect, it } from "vitest";
import { sign, verify } from "../src";

describe("message sign and verify", () => {
  const privateKey =
    "963523425d5de8ad42320df7ec9ba0e7f15783914da16e0aff93df20c7b668fb";
  const privateKeyWIF = "T85xhCTbfJnMW4a8qB4ubAFVgshrDdU9jcDmrSgNntTp6YSrub7M";
  const address = "LX5QcHjFAn5jmip89ypLrHyEPQbxUn9XVK";
  const message = "Hello World";
  const signature =
    "IIHJVUBhHEnGXun89PyIyoua265DKhACWFxG3LRAJTz+S03huR+vIaWhgJPYDoxAlS/EFN7nqydAfP6n+UBDvdY=";
  const network = rvn.mainnet;

  it("should sign a message for ravencoin with a private key", () => {
    const result = sign({
      privateKey,
      message,
      network,
    });

    expect(result).not.toBe(null);
    expect(result).toBe(signature);
  });

  it("should sign a message for ravencoin with a private key wif", () => {
    const result = sign({
      privateKeyWIF,
      message,
      network,
    });

    expect(result).not.toBe(null);
    expect(result).toBe(signature);
  });

  it("should verify a message for ravencoin", () => {
    const result = verify({
      address,
      message,
      signature,
      network,
    });

    expect(result).toBe(true);
  });
});
