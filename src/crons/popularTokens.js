const cron = require('node-cron');
const { getTopTokenLinks } = require("../utility/scrapping_basescanTop_tokens")
const { getTopBaseTokenPrice } = require("../utility/moralis")
const holdLogo = require('../module/logoHolding');
const DB = require("../module/top_tokens");

const papolarTokenList = async () => {
    try {
        const arrayofTokens = await getTopTokenLinks(50);
        const tokenData = []
        for (token of arrayofTokens) {
            try {
                const object = await getTopBaseTokenPrice(token);

                if (object) {
                    tokenData.push(object);
                }

            } catch (error) {
                console.log('skip');
            }
        }
        await DB.deleteMany();
        for (data of tokenData) {
            const exist = await holdLogo.findOne({ address: data.tokenAddress });
            if (!exist) {
                await holdLogo.create({
                    address: data.tokenAddress,
                    logo: data?.tokenLogo || null
                })
            }
            
            await DB.create({
                name: data.tokenName,
                symbol: data.tokenSymbol,
                contract_address: data?.tokenAddress || null,
                percentChange: data['24hrPercentChange'],
                usdPrice: data.usdPrice,
                logo: data?.tokenLogo || exist?.logo || null

            })


        }

    }

    catch (error) {
        console.log(error)
        return error
    }
}
// papolarTokenList();
cron.schedule('0 0 0 * * *', () => {
    papolarTokenList();
    console.log('running a task every day at midnight');
});


