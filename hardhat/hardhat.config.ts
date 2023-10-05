require("dotenv").config();

import "@nomicfoundation/hardhat-toolbox";
import main from "./scripts/sendFrom";
import { task } from "hardhat/config";

task("sendFrom", "Send tokens using the OFT contract")
  .addParam("qty", "The quantity to send")
  .setAction(async (taskArgs, hre) => {
    await main(taskArgs.qty); // Pass the qty parameter to the main function
  });

module.exports = {
  solidity: "0.8.19",
  networks: {
    avalanche: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};