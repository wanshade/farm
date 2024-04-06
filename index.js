require('dotenv').config();
const colors = require('colors');
const readline = require('readline-sync');
let count = 0;
const callRpcEthereum = require('./callRpcEthereum');
const callRpcNear = require('./callRpcNear');
const callRpcAxelar = require('./callRpcAxelar');
const callRpcStarkNet = require('./callRpcStarknet');

// Define RPC URLs
const ethereumRPCURL = process.env.ETH_RPC_URL;
const nearRPCURL = process.env.NEAR_RPC_URL;
const starknetRPCURL = process.env.STARKNET_RPC_URL;
const axelarRPCURL = process.env.AXELAR_RPC_URL;

function waitRandomSeconds(min, max) {
  const randomSeconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, randomSeconds * 1000));
}

async function loopRPC() {
  console.log('Choose your preferred blockchain:');
  console.log('1. Ethereum');
  console.log('2. NEAR');
  console.log('3. StarkNet');
  console.log('4. Axelar');

  const choice = readline.question('Enter your choice: ');

  let url;
  switch (choice) {
    case '1':
      url = ethereumRPCURL;
      while (true) {
        await callRpcEthereum(url, count++);
        console.log(`Waiting for 5-20 seconds...`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '2':
      url = nearRPCURL;
      while (true) {
        await callRpcNear(url, count++);
        console.log(`Waiting for 5-20 seconds...`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '3':
      url = starknetRPCURL;
      while (true) {
        await callRpcStarkNet(url, count++);
        console.log(`Waiting for 5-20 seconds...`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '4':
      url = axelarRPCURL;
      while (true) {
        await callRpcAxelar(url, count++);
        console.log(`Waiting for 5-20 seconds...`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    default:
      console.log('Invalid choice. Please choose 1, 2, 3, or 4.');
  }
}

loopRPC();
