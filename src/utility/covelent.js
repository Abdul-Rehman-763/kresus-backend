const axios = require("axios");
const { tokenDetail } = require("../services/chain");
const Moralis = require("moralis")
require('dotenv').config()
const ethers = require('ethers')

const getHolderCount = async (chainId, contractAddress) => {
  const url = `https://deep-index.moralis.io/api/v2.2/erc20/${contractAddress}/holders?chain=base`;
  const { data } = await axios.get(url, {
    headers: {
      'accept': 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY
    }
  });
 if(data){
  return data;
 }
  // return data.data.pagination.total_count; // number of holders
}

const totalsupply = async (contractAddress) => {
  // Moralis Base Mainet RPC (replace with your actual API key)
  const moralisRpc = "https://rpc.ankr.com/base/f0a837a72140defb3d834ddae7d58f7a545a430eb2f8ca7414f917ef756312b9";

  const provider = new ethers.JsonRpcProvider(moralisRpc);

  // Minimal ERC20 ABI
  const abi = [
    "function totalSupply() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const totalSupplyRaw = await contract.totalSupply();
  const decimals = await contract.decimals();
  const symbol = await contract.symbol();

  const totalSupply = ethers.formatUnits(totalSupplyRaw, decimals);


  return (totalSupply);
}
const TokenDetail = async (chainId, contract_address) => {

  const apiKey = process.env.COVALENT_API_KEY;
  console.log(chainId, 'this is id')
  // Token supply + holders

  const totalSupply = await totalsupply(contract_address);
  console.log("total supply", totalSupply)

  // Price
  const priceUrl = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${8453}/USD/${contract_address}/?key=${apiKey}`;
  const { data: priceData } = await axios.get(priceUrl);
  const price = priceData.data[0].prices[0].price;
  const circulatingSupply = totalSupply - price
  // Top 5 holders
  // const topHolders = holdersData.data.items
  //     .slice(0, 5)
  //     .map(h => ({
  //         address: h.address,
  //         balance: h.balance / (10 ** h.contract_decimals),
  //     }));

  return {
    contract_address,
    maximum_supply: totalSupply,
    circulatingSupply,
    price,
    // topHolders,
  };

}
const getTokenDetails = async (contractAddress, chainId) => {
  try {
    const url = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=base&addresses=${contractAddress}`
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'X-API-Key': process.env.MORALIS_API_KEY
      }
    })
    const data = await response.json()
    return data;
  } catch (e) {
    console.error(e);
  }


  // const Holders = await getHolderCount(chainId, contractAddress);
  // console.log(data);
  // const newData = {
  //   name: data.data.name,
  //   symbol: data.data.symbol,
  //   contract_address: data.data. contract_address,
  //   circulating_supply: data.data.market_data.circulating_supply,
  //   total_supply: data.data.market_data.total_supply,
  //   image: data.data.image.small,
  //   maxSupply: data.data.market_data?.max_supply,
  //   // Holders
  // }

  // return newData
}


const tokenHistory = async (chainId, tokenAddress, DATE1, DATE2, currency = "USD") => {
  // const url = `https://api.covalenthq.com/v1/${chainId}/pricing/historical_by_addresses_v2/${currency}/${tokenAddress}/?from=${DATE1}&to=${DATE2}&prices-at-asc=true&`;
  const options = { method: 'GET', headers: { Authorization: `Bearer ${process.env.COVALENT_API_KEY}` } };
  console.log(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainId}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}`)
  const response = await fetch(`https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainId}/USD/${tokenAddress}/?from=${DATE1}&to=${DATE2}&prices-at-asc=true`, options)

  try {

    const data = await response.json()
    console.log('this is respone', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
  const getTokenDetailsCoinGeecko=async(address)=>{
    try {
      const url = `https://pro-api.coingecko.com/api/v3/onchain/networks/base/tokens/${address} `
      const response = await axios.get(url,
        {
          headers:{
            'x-cg-pro-api-key':process.env.COIN_GEECKO_API_KEY
          }
        }
      )
      console.log()
      return response.data.data.attributes;
      
    } catch (error) {
      console.log(error)
      throw error
    }
  }


module.exports = { totalsupply, TokenDetail, getTokenDetails, tokenHistory, getHolderCount ,getTokenDetailsCoinGeecko}