const axios = require('axios');
const cheerio = require('cheerio');

const BASE = 'https://basescan.org';

exports.getTopTokenLinks=async(limit = 10)=> {
  const url = `${BASE}/tokens`;
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const $ = cheerio.load(data);
  const links = [];

  $('#ContentPlaceHolder1_tblErc20Tokens > table > tbody > tr').each((i, el) => {
    if (i >= limit) return false; // stop after limit
    const link = $(el).find('td:nth-child(2) a').attr('href');
    if (link) {
      links.push(`${BASE}${link}`);
    }
  });
  
 const addresses= links.map(link=>{
    return link.replace("https://basescan.org/token/",'');
  })
console.log(addresses);
return addresses
}


