const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
app.use(cors())


const telegramApiUrl = "https://api.telegram.org/bot";
const botApiKey = "6510381491:AAFN3KidcOZvCwLTFZ6MdisIQXWOZZMhljc";


/**
 * Faz uma requisição pra API do Telegram.
 *
 * @param {string} endpoint
s */
const request = async (endpoint, body) => {

  try {

    let options;
    if (typeof body !== "undefined") {

      options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      };
    }

    const response = await fetch(`${telegramApiUrl}${botApiKey}/${endpoint}`, options);
    const content = await response.json();
    console.log(body.text + '----' + new Date().toISOString());
    return content;

  } catch (err) {
    console.error(`Ocorreu um erro ao fazer a requisição: ${err}`);
    return {};
  }
}

const fetchData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
      responseType: 'json'
    })
    const cachedData = response.data.map((item) => item.name)

    // console.log(`${cachedData}`)


    if ((new Date().getSeconds()) >= 5 && (new Date().getSeconds()) <= 55) {

      const body = {
        chat_id: 1657028115,
        text: cachedData[0]
      };

      await request("sendMessage", body);
    }

  } catch (error) {
    console.log(error);
  }

  
};

setInterval(fetchData, 1000); 


app.listen('4567')