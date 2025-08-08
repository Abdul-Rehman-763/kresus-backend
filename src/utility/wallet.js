const solanaWeb3 = require('@solana/web3.js');
const ethers = require("ethers");
module.exports = {
    solanaWallet: () => {

        const keypair = solanaWeb3.Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        console.log(publicKey);
        const privateKey = Buffer.from(keypair.secretKey).toString('hex')
        return { publicKey, privateKey };
    },
    baseWallet:  () => {
        const wallet = ethers.Wallet.createRandom()
        return { wallet: wallet.address, privateKey: wallet.privateKey }
    },
    wldWallet:  () => {
        const wallet = ethers.Wallet.createRandom()
        return { wallet: wallet.address, privateKey: wallet.privateKey }
    }
}