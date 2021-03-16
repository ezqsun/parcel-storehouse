import jose from 'node-jose';
import fs from 'fs';

async function generateKey(): Promise<jose.JWK.Key> {
  const keyStore = jose.JWK.createKeyStore();
  return keyStore.generate('RSA', 2048, {alg: 'RS256', use: 'sig' })
    .then((key) => {
      fs.writeFileSync(
        'keys.json', 
        JSON.stringify(keyStore.toJSON(true))
      );
      return key;
    });
}

function getKeys() {
  
  const ks = fs.readFileSync('keys.json');
  return jose.JWK.asKeyStore(ks.toString());
}

export async function sign(): Promise<jose.JWS.CreateSignResult> {
  const keys = await getKeys().catch(generateKey).then(getKeys);

  const [key] = keys.all({ use: 'sig' });
  
  const opt = { compact: true, jwk: key, fields: { typ: 'jwt' } };
  const payload = JSON.stringify({
    exp: Math.floor((Date.now() + 86400000) / 1000),
    iat: Math.floor(Date.now() / 1000),
    sub: 'test',
  });

  const token = await jose.JWS.createSign(opt, await jose.JWK.asKey(key))
    .update(payload)
    .final();
  
  return token;
}