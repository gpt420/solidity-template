import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-foundry";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-chai-matchers'


import "hardhat-gas-reporter";
import "solidity-coverage";
import { HardhatRuntimeEnvironment } from "hardhat/types";


const accounts = [
  vars.get(
    "PRIVATE_KEY",
    // `keccak256("DEFAULT_VALUE")`
    "0x0d1706281056b7de64efd2088195fa8224c39103f578c9b84f951721df3fa71c",
  ),
];

task("accounts", "Prints the list of accounts", async (_, hre: HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("evm", "Prints the configured EVM version", async (_, hre: HardhatRuntimeEnvironment) => {
  console.log(hre.config.solidity.compilers[0].settings.evmVersion);
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings:{
      optimizer: {
        enabled: true
      },
      evmVersion: "paris", // Don't want PUSH0
    }
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
    alwaysGenerateOverloads: false,
    externalArtifacts: ["externalArtifacts/*.json"],
    dontOverrideCompile: false,
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache-hardhat",
    sources: "contracts",
    tests: "test",
  },
  networks:{
    hardhat: {
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "shanghai",
      forking: {
        url: vars.get("ETH_MAINNET_URL", "https://rpc.ankr.com/eth"),
        // The Hardhat network will by default fork from the latest mainnet block
        // To pin the block number, specify it below
        // You will need access to a node with archival data for this to work!
        // blockNumber: 14743877,
        // If you want to do some forking, set `enabled` to true
        enabled: false,
      },
      // zksync: true, // Enable zkSync in the Hardhat local network
    },
    sepolia: {
      chainId: 11155111,
      url: vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
      accounts,
    },
    polygon: {
      chainId: 137,
      url: vars.get("POLYGON_MAINNET_URL", "https://polygon-rpc.com"),
      accounts,
    },
    polygonzkevm: {
      chainId: 1101,
      url: vars.get("POLYGON_ZKEVM_MAINNET_URL", "https://zkevm-rpc.com"),
      accounts,
    },
    optimism: {
      chainId: 10,
      url: vars.get("OPTIMISM_MAINNET_URL", "https://mainnet.optimism.io"),
      accounts,
    },
    scroll: {
      chainId: 534352,
      url: vars.get("SCROLL_MAINNET_URL", "https://rpc.scroll.io"),
      accounts,
    },
  },
  etherscan: {
    apiKey:{
      sepolia: vars.get("ETHERSCAN_API_KEY", ""),
    }
  }
};

export default config;
