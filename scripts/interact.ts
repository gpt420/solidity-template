import { formatEther, parseEther } from "viem";
import hre from "hardhat";

import { Lock } from "../typechain-types";

async function main() {
  const LOCK_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract: Lock = await hre.viem.getContractAt("Lock", LOCK_ADDRESS);
  const unlockTime = await contract.unlockTime();

  console.log(`Contract is unlocked until ${unlockTime}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
