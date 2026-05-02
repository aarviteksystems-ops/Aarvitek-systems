import crypto from 'node:crypto';

if (typeof crypto.hash !== 'function') {
    // Polyfill for crypto.hash (added in Node v21.7.0)
    // @ts-ignore
    crypto.hash = (algorithm: string, data: crypto.BinaryLike, outputEncoding?: any) => {
        const hash = crypto.createHash(algorithm);
        hash.update(data);
        if (outputEncoding) {
            return hash.digest(outputEncoding);
        }
        return hash.digest();
    };
    console.log('Polyfilled crypto.hash for Node.js < v21.7.0');
}
