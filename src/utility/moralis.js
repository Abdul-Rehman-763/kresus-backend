const { response } = require("express");
const Axios = require("./Axios");
require('dotenv').config();
const axios = require('axios')
module.exports = {
    getTopBaseTokenPrice: async (token) => {
        try {
            console.log(token);
            const url = `https://deep-index.moralis.io/api/v2.2/erc20/${token}/price?chain=base&include=percent_change`
            const skip=[];
            const response = await axios(url, {
                method: 'get',
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': process.env.MORALIS_API_KEY
                }
            }
            )
            if(!response?.data){
                return {data:"undefined"}
            }
            return response.data
        } catch (error) {
            throw error
            // console.log(error,'this is catch block get token base url');
        }
    }
}
