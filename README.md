## OFT Token Transfer Script

This script is designed to interact with the OFT smart contract to facilitate token transfers using `estimateFees()` and `sendFrom()`.

- `estimateFees()`: This function provides an estimate of the fees required to send a certain amount of tokens.
- `sendFrom()`: This function allows you to send tokens from one address on the source blockchain to another on the destination.

This document will guide you through setup and usage.

### Prerequisites

Ensure that you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Initialization

Clone the repository and navigate to the hardhat folder: `cd hardhat`.
Install the required npm packages by running:

```
npm install
```

Create a `.env` file in the root directory of the repository and add the following variables:

```
RPC_ENDPOINT=<Your_RPC_Endpoint_URL>
PRIVATE_KEY=<Your__Private_Key>
```

`RPC_ENDPOINT`: This should be the URL of your Ethereum JSON RPC endpoint.
`PRIVATE_KEY`: The private key of the Ethereum address you intend to use with the script.

Ensure you have the necessary configurations set up in hardhat.config.js. If you're using the Avalanche network, make sure to add its configuration:

```
module.exports = {
    networks: {
        avalanche: {
            url: process.env.RPC_ENDPOINT,
            accounts: [process.env.PRIVATE_KEY],
            chainId: <Avalanche_ChainID>
        },
        // ... other networks
    },
    // ... other configurations
};
```

### Running the Script

To test the script on the Avalanche network:

```
npx hardhat run scripts/sendFrom.js --network avalanche
```

This will initiate the token transfer, estimate the fees, and log the transaction details.

To see if your transaction is successful, plug the transaction hash into [LayerZero Scan](https://layerzeroscan.com/).

### How the Script Works

1. **Setup**: The script starts by initializing the RPC provider and the wallet using the provided private key.
2. **Contract Initialization**: It then imports the ABI for the OFT contract and sets up a contract instance using the provided contract address.
3. **Fee Estimation**: Before executing the token transfer, the script estimates the fees associated with the transaction using the `estimateSendFee()` function of the OFT contract.
4. **Token Transfer**: The script calls the `sendFrom()` function to initiate the token transfer.
5. **Confirmation**: It then waits for the transaction to be confirmed and logs the transaction hash.



## ABI

To interact with the `SHRAPToken` contract, you'll need its ABI. The ABI can be generated from the contract's source code using the Solidity compiler.

## estimateFees()

Before sending tokens, it's recommended to estimate the fees. Using the `estimateFees()` function in the contract:

```
// Prepare the parameters for the estimateSendFee function
let dstChainId = 148;  // Example value, replace with the appropriate chain ID
let toAddress = ethers.utils.arrayify('0xc13b65f7c53Cd6db2EA205a4b574b4a0858720A6'); // Convert the address to bytes
let amount = ethers.utils.parseEther('0.001'); // The amount to send
let useZro = false; // Whether to use ZRO for fees
let adapterParams = ethers.utils.arrayify('0x'); // Any additional parameters required for the adapter, if any

// Call the function
let [nativeFee, zroFee] = await shrap.estimateSendFee(dstChainId, toAddress, amount, useZro, adapterParams);

// Display the estimated fees
console.log("Estimated native fee:", ethers.utils.formatEther(nativeFee));
console.log("Estimated ZRO fee:", ethers.utils.formatEther(zroFee));
```