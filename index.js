require('dotenv').config();
const colors = require('colors');
const readline = require('readline-sync');
let count = 0;
const callRpcEthereum = require('./callRpcEthereum');
const callRpcNear = require('./callRpcNear');
const callRpcAxelar = require('./callRpcAxelar');
const callRpcStarkNet = require('./callRpcStarknet');
const address = '0xa3242C63f875e5442B80EB0D31873201CF3923f7'
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
  console.log('Pilih mau farm yang mana bosquee:');
  console.log('1. Ethereum');
  console.log('2. NEAR');
  console.log('3. StarkNet');
  console.log('4. Axelar');

  const choice = readline.question('pilih yang mana : ');

  let url;
  switch (choice) {
    case '1':
      url = ethereumRPCURL;
      while (true) {
        await callRpcEthereum(url, 'eth_blockNumber', [], count++);
        await callRpcEthereum(url, 'eth_gasPrice', [], count++);
        await callRpcEthereum(url, 'eth_getBalance', [address, 'latest'], count++);
        console.log(`sabar ya bosquee tunggu 5-20 detik...`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '2':
      url = nearRPCURL;
      while (true) {
        await callRpcNear(url, count++);
        console.log(`sabar ya bosquee tunggu 5-20 detik`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '3':
      url = starknetRPCURL;
      while (true) {
        await callRpcStarkNet(url, count++);
        console.log(`sabar ya bosquee tunggu 5-20 detik`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    case '4':
      url = axelarRPCURL;
      while (true) {
        await callRpcAxelar(url, count++);
        console.log(`sabar ya bosquee tunggu 5-20 detik`.yellow);
        await waitRandomSeconds(5, 20);
      }
      break;
    default:
      console.log('yang bener aja bosquee . pilih 1, 2, 3, or 4.');
  }
}

loopRPC();
