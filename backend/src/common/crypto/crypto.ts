import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto';
import { Buffer } from 'buffer';

@Injectable()
export default class CryptoAes128Gcm {
  encryptAes256Gcm(text) {
    const key = process.env.CRYPTO_KEY;
    const iv = Crypto.randomBytes(12);
    const cipher = Crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, encrypted, tag]).toString('base64');
  }

  decryptAes256Gcm(encdata) {
    if (!encdata) {
      return '';
    }

    const key = process.env.CRYPTO_KEY;
    const bData = Buffer.from(encdata, 'base64');
    const iv = bData.subarray(0, 12);
    const text = bData.subarray(12, bData.length - 16); 
    const tag = bData.subarray(bData.length - 16);

    const decipher = Crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return decipher.update(text) + decipher.final('utf8');
  }
}
