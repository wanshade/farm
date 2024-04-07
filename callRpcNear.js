const axios = require('axios');

async function callRpcNear(url, count) {
  try {
    const { data } = await axios({
      method: 'POST',
      url,
      data: {
        jsonrpc: '2.0',
        id: 'copzies',
        method: 'block',
        params: { finality: 'final' },
      },
    });

    console.log(
      `NEAR RPC sudah di request ${++count} kali – Block Height: ${JSON.stringify(
        data.result.header.height
      )}`.cyan
    );
  } catch (error) {
    console.error(
      'Error fetching latest NEAR block:',
      JSON.stringify(error.message)
    );
  }
}

module.exports = callRpcNear;
