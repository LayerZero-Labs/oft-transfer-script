task("sendFrom", "Send tokens using the OFT contract")
  .addParam("qty", "The quantity to send")
  .setAction(async (taskArgs, hre) => {
    await main(taskArgs.qty); // Pass the qty parameter to the main function
  });