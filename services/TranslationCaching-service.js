const RestUtil = require('../common/rest-util');
 const MongoDB = require('../common/mongo-util');
const  HTMLParser   =require('node-html-parser');
const axios = require('axios');

class UserService {
    constructor(config) {
        this.config = config;
        this.restUtil = new RestUtil();
         this.mongoDB = new MongoDB(config.get('mongodb:url'));
       
      
         this.findUserwithMobile = this.findUserwithMobile.bind(this); 
        
        
         this.findUserwithMobileRefer = this.findUserwithMobileRefer.bind(this); 
       
         this.findAndUpdateCallStatus=this.findAndUpdateCallStatus.bind(this)
         this.correctForPolly=this.correctForPolly.bind(this);
    }

    async findUserwithMobileRefer(mobile_no,campaign_id,loan_number){
     
      let Mobile_no={'Mobile No':mobile_no,'campaign_id':+campaign_id,'Loan Acc No':loan_number}
      console.log('in find function',Mobile_no,campaign_id);
      let result=await this.mongoDB.findRecord("indostar_emi_calls", Mobile_no, {});
     
       return result;
       
    }
  
    async findUserwithMobile(mobile_no,campaign_id){
      
        let Mobile_no={'Mobile No':mobile_no,'campaign_id':+campaign_id ,call_status: 'pending'}
        console.log('in find function',Mobile_no,campaign_id);
        let result=await this.mongoDB.findRecord("indostar_emi_calls", Mobile_no, {});
       
         return result;
         
    }
    async findAndUpdateCallStatus(mobile_no,campaign_id,bot_type,session_id){
      let Mobile_no={'Mobile No':mobile_no,'campaign_id':+campaign_id ,call_status: 'pending'}
    let finalValue = {
        "$set": {
          call_status: 'complete',
          'bot-type':  bot_type,
          'session_id':session_id,    
          }
        };
        return this.mongoDB.findAndUpdate("indostar_emi_calls", Mobile_no,finalValue);
  }
   
  async findAndUpdateWelcome(mobile_no,campaign_id,input,session_id,loan_number){
    let data={'Mobile No':mobile_no,'campaign_id':+campaign_id,'Loan Acc No':loan_number}
  let finalValue = {
      "$set": {
          'Customer_rating':input,
          'session_id':session_id,
          'bot-type':'welcome'        
        }
      };
      console.log('data,finalvlue for welcome bot',data,finalValue)
      return this.mongoDB.findAndUpdate("indostar_emi_calls", data,finalValue);
}
   
   async correctForPolly(str) {
        if (str) str = str.split("").join(" ");
        return str;
      }


}


module.exports = UserService;