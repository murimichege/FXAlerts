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
      //Currency_API_Id: API.id
    })
    }
    
    function addCurrencyPairLimits(){
    
      const LimitDoc = firebase.firestore().collection("CURRENCY_PAIR_LIMIT").doc()
      const Limit_CurrencyPair_Id  = firebase.firestore().collection('CURRENCY_PAIR')
      .where('CurrencyPair_id', '==', CurrencyPair_id)
      .get()
      LimitDoc.set({
        Limit_id: LimitDoc.id,
        Limit_Currenct_Pair_Id:  Limit_CurrencyPair_Id,  // make a document reference to this field
        Limit_Buy_Price_Threshhold :  BuyThreshhold,
        Limit_Sell_Price_Threshhold:  SellThreshhold

      })

    }/*
    <TextInput
                  style={styles.textInputStyle}
                  value={BuyThreshhold}
                  onChangeText = {(BuyThreshhold) => setBuyThreshhold(BuyThreshhold)}
                  placeholder="BuyThreshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  keyboardType='decimal-pad'	
                />
                 <TextInput
                  style={styles.textInputStyle}
                  value={SellThreshhold}
                  onChangeText = {(SellThreshhold) => setSellThreshhold(SellThreshhold)}
                  placeholder="Sell Threshhold"
                  placeholderTextColor="#60605e"
                  numeric
                  keyboardType='decimal-pad'	
                />*/