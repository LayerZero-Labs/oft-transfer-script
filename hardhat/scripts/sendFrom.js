require("dotenv").config();
const { Contract, providers, Wallet, utils } = require("ethers");
const hre = require("hardhat");

async function main() {
    // Set up the RPC provider and wallet with the private key
    const rpc = new providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
    const wallet = new Wallet(process.env.PRIVATE_KEY, rpc);
    // Import the ABI for the OFT contract
    const abi = require('../abi/oft.json');

    // Define the address of the OFT contract
    const OFTContractAddress = "0xd402298a793948698b9a63311404fbbee944eafd";
    // Create a contract instance using the contract's address, ABI, and the wallet instance
    const OFTContract = new Contract(OFTContractAddress, abi, wallet);

    // Define parameters for estimateSendFee()
    const remoteChainId = 148; // Endpoint ID of the remote chain where funds will be sent
    const useZro = false; // Flag to indicate if ZRO should be used
    const adapterParams = '0x'; // Default adapter parameters

    // Define parameters for the sendFrom() function
    const sender = wallet.address; // Assuming sender is the wallet's address
    const toAddress = wallet.address; // Assuming receiver is ALSO the wallet's address
    const toAddressBytes32 = ethers.utils.defaultAbiCoder.encode(['address'],[toAddress]); // Convert the 'toAddress' to bytes32 for compatibility with the function parameters
    const amount = utils.parseEther('0.001'); // Define the amount to send in Ether units, the example is hardcoded
    const refundAddress = sender; // Address where gas refunds will be sent if necessary
    const zroAddress = '0x0000000000000000000000000000000000000000'; // ZRO wallet address
    
    // Estimate the fees for sending the token
    const [nativeFee, zroFee] = await OFTContract.estimateSendFee(remoteChainId, toAddressBytes32, amount, useZro, adapterParams);
    // Log the estimated fees
    console.log("Fees:", nativeFee.toNumber(), zroFee.toNumber());
    
    // Call the sendFrom function
    const tx = await OFTContract.sendFrom(sender, remoteChainId, toAddressBytes32, amount, refundAddress, zroAddress, adapterParams, nativeFee);
    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();

    // Log the transaction hash and a message for the user
    console.log(` Plug this tx hash into LayerZero Scan: ${receipt.transactionHash}`);
    console.log(`* check your address [${sender}] on the destination chain, in the ERC20 transaction tab!`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });