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
const url = "https://evm-cronos.crypto.org/"

// TEST
// 0x66e428c3f67a68878562e79A0234c1F83c208770

// Adresse du contrat du WCRO et de MMF (le DEx)
const addresses = {
    WCRO: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    router: "0x145677FC4d9b8F19B5D56d1820c48e0443049a30",
    target:  myAddress
}

const WCROAmount = ethers.utils.parseEther(amountToSwap).toHexString();
const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
const gas = {
    gasPrice: gasPrice,
    gasLimit: 1500000
}

// URL de RCP
const CROprovider = new ethers.providers.JsonRpcProvider(url);
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