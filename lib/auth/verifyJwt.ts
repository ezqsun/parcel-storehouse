import jose from 'node-jose';
import fs from 'fs';

function getKeys() {
  
  const ks = fs.readFileSync('keys.json');
  return jose.JWK.asKeyStore(ks.toString());
}

export async function verify(payload: string): Promise<jose.JWS.VerificationResult | false> {
    try {

        const keys = await getKeys();

        const [key] = keys.all({ use: 'sig' });
      
        const verifyRes = await jose.JWS.createVerify(await jose.JWK.asKey(key)).verify(payload);
        
        return verifyRes;
    } catch (err: unknown) {
        return false;
    }
}