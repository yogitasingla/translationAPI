const replaceall = require("replaceall");
// const config = require('../utils/config-util');
const CommonUtil = require('../common/commonT-util');
class TranslationUtil{
    constructor(){
    }

    static fetchTranslatedText (text,language){
        const self = this;
        return new Promise((resolve, reject) => {
            try {
                console.log("INSIDE FETCH TRANSLATE TEXT")
                // const key = config.get('middleware:google:api');
                const googleTranslate = require('google-translate')('AIzaSyBJ8GDjbmxUnwrWtPG8K7--gKS-hKGav18');
                googleTranslate.translate(text, language, function(err, translation) {
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        const text = self.getFeminineSentence(translation.translatedText);
                        resolve(text);
                    }
                });
            } catch(err) {
                reject(err);
            }
        });
    }

    static getFeminineSentence(text){
        let t = replaceall("सकता", "सकती", text);
        t = replaceall("समझता", "समझती", t);
        t = replaceall("सकते हो", "सकते हैं", t);
        t = replaceall("कहो", "कहिये", t);
        t = replaceall("तुम", "आप", t);
        t = replaceall("महान", "बहुत अच्छा", t);
        t = replaceall("तुमने", "आपने", t);
        t = replaceall("बताओ", "बताईये", t);
        t = replaceall("तुम्हारा", "आपका", t);
        t = replaceall("तुम्हारी", "आपकी", t);
        t = replaceall("कहना", "कहिये", t);
        t = replaceall("सुनो", "सुनिए", t);
        t = replaceall("समझा", "समझी", t);
        t = replaceall("करेगा", "करुँगी", t);
        t = replaceall("कहूंगा", "कहूँगी", t);
        t = replaceall("करूँगा", "करुँगी", t);
        t = replaceall("कहता", "कहती", t);
        t = replaceall("सोता", "सोती", t);
        t = replaceall("रहता", "रहती", t);
        t = replaceall("रहा", "रही", t);
        t = replaceall("करता", "करती", t);
        t = replaceall("जानता", "जानती", t);
        t = replaceall("पायी", "पायी", t);
        t = replaceall("आपका वर्चुअल", "आपकी वर्चुअल", t);
        t = replaceall("पत्तियां", "छुट्टियां", t);
        t = replaceall("पत्तियों", "छुट्टियों", t);
        t = replaceall("पत्ते", "छुट्टी", t);
        t = replaceall("पत्ता", "छुट्टी", t);
        t = replaceall("पत्ती", "छुट्टी", t);
        return t;
    }

    static convertNlpResponseText(language,text){
        const self = this;
        if (language !== CommonUtil.recognitionLanguages().ENGLISH_INDIAN){
            const translatedText =  self.fetchTranslatedText(
                text,CommonUtil.mappingLanguage(language)
            );
            return translatedText;
        }
    }
}

module.exports = TranslationUtil;
