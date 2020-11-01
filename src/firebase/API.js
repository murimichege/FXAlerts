//function adding currency pair selected for creating an alert into Database
function addCurrencyPair(){
    let askPrice = ([...currency.data.prices[clickedindex].closeoutAsk].join('').toString())
    let bidPrice =( [...currency.data.prices[clickedindex].closeoutBid].join('').toString())
    let CurrencyPair =  ([...currency.data.prices[clickedindex].instrument].join('').toString())
    let CurrencyPairDoc = firebase.firestore().collection("CURRENCY_PAIR").doc()
    
    CurrencyPairDoc.set({
      CurrencyPair_id: CurrencyPairDoc.id,
      CurrencyPair_Name: CurrencyPair,
      Currency_AskPrice: askPrice,
      Currency_BidPrice: bidPrice,
      Currency_API_Id: API.id
    })
    }
    
    function addCurrencyPairLimits(){
    
      const LimitDoc = firebase.firestore().collection("CURRENCY_PAIR_LIMIT").doc()
      LimitDoc.set({
        Limit_id: LimitDoc.id,
        Limit_Currenct_Pair_Id:  CurrencyPair_id,
        Limit_Buy_Price_Threshhold :  BuyThreshhold,
        Limit_Sell_Price_Threshhold:  SellThreshhold

      })

    }
    //function that adds the api to the database
/*function addAPI(){
  const API = firebase.firestore().collection("API").doc()
  let APINAME = 'OANDA v20 REST API'
  let APIKEY = ' 32cd6e9c938cebaebd432bc4e159c89a-cc978615208267981f4aa3c1eda55d88'
  //let APIURL = 'https://api-fxpractice.oanda.com/v3/accounts/101-004-14328428-002/pricing?'
  //'instruments=AUD_CAD%2CAUD_CHF%2CAUD_JPY%2CAUD_NZD%2CAUD_USD%2CCAD_CHF%2CCAD_JPY%2CCHF_JPY%2CEUR_AUD%2CEUR_CAD%2CEUR_CHF%2CEUR_GBP%2CEUR_NZD%2CEUR_USD%2CGBP_AUD%2CGBP_CAD%2CGBP_CHF%2CGBP_USD%2CGBP_JPY%2CNZD_CAD%2CNZD_CHF%2CNZD_JPY%2CUSD_CAD%2CUSD_JPY%2CUSD_CHF%2CXAU_USD'

  API.set({
  API_Id: API.id,         
  API_Name: APINAME,
  API_Key: APIKEY,
 // API_URL: APIURL
  })
}*/
