const config = require('../common/config-util');
const MessageUtil = require('../common/message-util');

//const DateUtil = require('../common/libs/date-util');
const RestUtil = require('../common/rest-util');
const UserService = require('../services/TranslationCaching-service');
const FormData = require('form-data')

const DateUtil = require('../common/date-util')
const axios = require('axios');
const CommonUtil = require('../common/commonT-util');
const TranslationUtil= require('../common/translation-util');
var converter = require('number-to-words');
var loanNumber;
const { json } = require('body-parser');
const {NumberToWord,hindi, kananda, english, telagu, marathi}= require("multilingual-number-to-words");
const { response } = require('express');

    

class WebhookController {
    constructor(config) {
        this.userService = new UserService(config);
       
      
         this.TranslationCaching=this.TranslationCaching.bind(this);
       
         
    }
    async TranslationCaching(req,res){
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "X-Requested-With");
      try {
        let response = {};
         console.log('req.body---------',req.body)
         let translation_lang=req.body.translation_lang;
       let langs= await this.translationLanguages(translation_lang)
         console.log('langs',typeof langs)
         let text=req.body.text;
       let translated_text = await TranslationUtil.fetchTranslatedText(
        text,langs
     );
     response={
      msg:translated_text,
      status:'Successful'
    }
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
      }catch(e){
          console.log("eeeeeeeeeeeeeeeee",e)
           res.setHeader('Content-Type', 'application/json');
           res.send(this.nlpHandler.fetchUnableProcessResponse());
           res.end();
    }
  }
  async translationLanguages(lang) {
    console.log('lang---------',lang)
   if(lang==='english'){
     return 'en'
   }
   else if(lang==='GUJARATI'){
     let val='gu'
    return val
   }
   else if(lang==='TELUGU'){
    return 'te'
   }
   else if(lang==='TAMIL'){
    return 'ta'
   }
   else if(lang==='MARATHI'){
    return 'mr'
   }
   else if(lang==='KANNADA'){
    return 'kn'
   }
   else if(lang==='HINDI'){
    return 'hi'
   }
   
};

  
  
   
}
module.exports = WebhookController;
