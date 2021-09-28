const randToken = require('rand-token');

class CommonUtil {
    constructor() {

    }

    static convertToTitleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    };

    static pickRandomValue(array) {
        let value = array[Math.floor(Math.random() * array.length)];
        return value;
    };

    static mappingLanguage(language) {
        console.log("::::::::::::::::::"+ language);
        if (language === 'hi-IN')
            return 'hi';
        else if (language === 'en-IN')
            return 'en';
        else if (language === 'kn-IN')
            return 'kn';
        else if (language === 'ta-IN')
            return 'ta';
            else if (language === 'ma-IN')
            return 'ma';
            else if (language === 'te-IN')
            return 'te';
            else if (language === 'gu-IN')
            return 'gu';
            else if (language === 'ja-IN')
            return 'ja';    
    };

    static recognitionLanguages() {
        return {
            ENGLISH_INDIAN: 'en-IN',
            HINDI_INDIAN: 'hi-IN',
            KANNADA_INDIAN: 'kn-IN',
            JAPANESE_INDIAN:'ja-IN',
            MARATHI_INDIAN:'mr-IN',
            TAMIL_INDIAN:'ta-IN',
            TELUGU_INDIAN:'te-IN',
            GUJARATI_INDIAN:'gu-IN'
           
    };
    }
    static translationLanguages() {
        return {
            ENGLISH: 'en',
            HINDI: 'hi',
            KANNADA:'kn',
            JAPANESE:'ja-JP',
            MARATHI:'mr',
            TAMIL:'ta',
            TELUGU:'te',
            GUJARATI:'gu'
        }
    };

    static generateToken(bits) {
        return new Promise((resolve, reject) => {
            try {
                let tokenBits = 16;
                if (bits) {
                    tokenBits = bits;
                }
                let token = randToken.generate(tokenBits);
                resolve(token);
            } catch (err) {
                reject(err);
            }
        });
    }

    static generateUniqueId(bits) {
        function randomArray(size) {
            let arr = [];
            for (let count = 0; count < size; count++) {
                arr.push((Math.random() * 500).toFixed(0))
            }
            return arr;
        }

        let numeric = '0123456789';
        let alphaLower = 'abcdefghijklmnopqrstuvwxyz';
        let alphaUpper = alphaLower.toUpperCase();
        let alphaNumeric = numeric + alphaUpper + alphaLower;
        if (!bits) {
            bits = 8;
        }
        let chars = alphaNumeric;
        let max = Math.floor(256 / chars.length) * chars.length;
        let key = "";
        while (key.length < bits) {
            let arr = randomArray(bits - key.length);
            for (let i = 0; i < arr.length; i++) {
                let x = arr[i];
                if (x < max) {
                    key += chars[x % chars.length];
                }
            }
        }
        return key;
    }

    static getDatabaseUrl(url,database){
        console.log(url)
        console.log(database)
        url = url.replace('$user', database.user);
        url = url.replace('$password', database.password);
        url = url.replace('$host', database.host);
        url = url.replace('$port', database.port);
        url = url.replace('$database', database.name);
        return url;
    }

    static getCopy(object){
        if(object){
            return JSON.parse(JSON.stringify(object))
        }
        else return undefined
    }

    static ValidURL(str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) {
          return false;
        } else {
          return true;
        }
      }
}

module.exports = CommonUtil;

