const axios = require('axios');

async function callRpcEthereum(url, method, params, count) {
  try {
    const { data } = await axios({
      method: 'POST',
      url,
      data: {
        id: 1,
        jsonrpc: '2.0',
        method: method,
        params: params
      },
    });

    console.log(
      `Ethereum RPC sudah di request ${++count} kali – ${JSON.stringify(
        data
      )}`.green
    );
  } catch (error) {
    console.log(
      `Error in Ethereum RPC: ${JSON.stringify(error.response.data)}`.red
    );
  }
}

module.exports = callRpcEthereum;
