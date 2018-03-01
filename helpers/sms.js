const request = require('request');
const parseString = require('xml2js').parseString;

const sendSms = (number,text ) => {
  const urlApi = `https://reguler.zenziva.net/apps/smsapi.php?userkey=k9d4p8&passkey=afifmaulana&nohp=${number}&pesan=${text}`;
  const cekSisaSms =`https://reguler.zenziva.net/apps/smsapibalance.php?userkey=k9d4p8&passkey=afifmaulana`;
  request(urlApi,(err,response,body) => {
    parseString(body, function (err, result) {
      console.dir(result.response.message[0]);
    });
  });
}

module.exports = {
  sendSms: sendSms
};
