import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import * as Crypto from 'crypto';
@Injectable()
export default class CryptoAes256Gcm {
  encryptAes256Gcm(text: string) {
    const key = process.env.CRYPTO_KEY;
    const secretKey: Buffer = Buffer.from(key, 'utf-8');
    const ivParameter: Buffer = Buffer.from(key.slice(0, 16));
    const cipher: Crypto.Cipher = Crypto.createCipheriv('aes-256-gcm', secretKey, ivParameter);
    let encryptedValue: string = cipher.update(text, 'utf-8', 'base64');
    encryptedValue += cipher.final('base64');
    return encryptedValue;
  }

  decryptAes256Gcm(encdata: string) {
    const key = process.env.CRYPTO_KEY;
    const secretKey: Buffer = Buffer.from(key, 'utf-8');
    const ivParameter: Buffer = Buffer.from(key.slice(0, 16));
    const cipher: Crypto.Cipher = Crypto.createCipheriv('aes-256-gcm', secretKey, ivParameter);
    let decryptedValue: string = cipher.update(encdata, 'base64', 'utf-8');
    decryptedValue += cipher.final('utf-8');
    return decryptedValue;
  }
}
