const hre = require("hardhat");

async function main() {
  const DonationConnection = await hre.ethers.getContractFactory("DonationConnection");
  const donationConnection = await DonationConnection.deploy();

  await donationConnection.deployed();

  console.log(`DonationConnection deployed to ${donationConnection.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
