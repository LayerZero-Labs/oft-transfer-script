## OFT Token Transfer Script

This script is designed to interact with the OFT smart contract to facilitate token transfers using `estimateFees()` and `sendFrom()`.

- `estimateFees()`: This function provides an estimate of the fees required to send a certain amount of tokens.
- `sendFrom()`: This function allows you to send tokens from one address on the source blockchain to another on the destination.

### Usage

```
npx hardhat sendFrom --qty 100000000000000 --network avalanche
```

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

### Running the Script

To test the script on the Avalanche network:

```
npx hardhat sendFrom --qty 100000000000000 --network avalanche
```

This will initiate the token transfer, estimate the fees, and log the transaction details.

```
function sendFrom(
    address _from, // sender
    uint16 _dstChainId, // destination endpoint id
    bytes memory _toAddress, // receiver address
    uint256 _amount, // amount of tokens in wei units
    address payable _refundAddress, // refund address
    address _zroPaymentAddress, // ZRO payment address
    bytes memory _adapterParams, // relayer adapter parameters
    uint256 // unused parameter
  ) public payable virtual override {
    _send(
      _from,
      _dstChainId,
      _toAddress,
      _amount,
      _refundAddress,
      _zroPaymentAddress,
      _adapterParams
    );
  }
```

To see if your transaction is successful, plug the transaction hash into [LayerZero Scan](https://layerzeroscan.com/).

### How the Script Works

1. **Setup**: The script starts by initializing the RPC provider and the wallet using the provided private key.
2. **Contract Initialization**: It then imports the ABI for the OFT contract and sets up a contract instance using the provided contract address.
3. **Fee Estimation**: Before executing the token transfer, the script estimates the fees associated with the transaction using the `estimateSendFee()` function of the OFT contract.
4. **Token Transfer**: The script calls the `sendFrom()` function to initiate the token transfer.
5. **Confirmation**: It then waits for the transaction to be confirmed and logs the transaction hash.
