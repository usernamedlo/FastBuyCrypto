const ethers = require('ethers');
const prompt = require('prompt-sync')({sigint: true});
const secret = require('./secret')

// À changer dans le json.
const privateKey = secret["private_key"]
const myAddress = secret["public_key"]

// 1 WCRO = 1 CRO = +/- 0.47$
const amountToSwap = '1'
const gwei = '5500'
const slippage = 0

// Adresse du contrat du WCRO et de Cronaswap (le DEx)
const addresses = {
    WCRO: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    router: "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918",
    target:  myAddress
}

const WCROAmount = ethers.utils.parseEther(amountToSwap).toHexString();
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
    gasPrice: gasPrice,
    gasLimit: 2000000
}

// URL de RCP
const CROprovider = new ethers.providers.JsonRpcProvider('https://evm-cronos.crypto.org');
const account = new ethers.Wallet(privateKey, CROprovider);

const router = new ethers.Contract(
    addresses.router,
    [
        'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
    ],
    account
);

const snipe = async (token) => {

    const tx = await router.swapExactETHForTokens(
        slippage,
        [addresses.WCRO, token],
        addresses.target,
        Math.floor(Date.now() / 1000) + 60 * 20, // 10 minutes from now
        {
            ...gas,
            value: WCROAmount
        }
    );
    console.log(`Swapping WCRO for tokens...`);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

const token = prompt('Input token address : ');

(async () => {
    await snipe(token);
})();