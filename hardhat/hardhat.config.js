require("@nomicfoundation/hardhat-toolbox");

const AVALANCHE_PRIVATE_KEY = "Your__Private_Key";

module.exports = {
  solidity: "0.8.19",
  networks: {
    avalanche: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      accounts: [AVALANCHE_PRIVATE_KEY]
    }
  }
};