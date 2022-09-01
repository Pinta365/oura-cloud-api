const baseUrl = "https://api.ouraring.com/v2/usercollection/";

const validateQS = (qs, allowedKeys) => {
    for (const key in qs) {
        if (Object.prototype.hasOwnProperty.call(qs, key)) {
            if (allowedKeys.includes(key) === false) {
                throw `Invalid parameter '${key}'.`;
            }
        }
    }
    return true;
};

class Client {
 
    constructor(accessToken) {
        if (!accessToken) {
            throw "Missing access token";
        }
        this.accessToken = accessToken;
    }
 
    #runRequest = async (url, qs) => { 
        const params = new URLSearchParams(qs); 

        const response = await fetch(baseUrl + encodeURI(url) + (qs ? "?" + params.toString() : ""), {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.accessToken
            }
        });   

        const parsed = await response.json();               
        if (response.status >= 200 && response.status < 300) {
            return parsed;
        } else {
            throw `${response.status} ${response.statusText}${parsed?.detail ? " - "+JSON.stringify(parsed.detail):""} `;
        }        
    };
 
    async getDailyActivity(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);       
        return await this.#runRequest("daily_activity", qs);
    }
 
    async getDailyReadiness(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);
        return await this.#runRequest("daily_readiness", qs);  
    }
 
    async getDailySleep(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);  
        return await this.#runRequest("daily_sleep", qs);  
    }
 
    async GetHeartrate(qs) {
        validateQS(qs, ["start_datetime", "end_datetime", "next_token"]);  
        return await this.#runRequest("heartrate", qs);  
    }
 
    async GetPersonalInfo() {
        return await this.#runRequest("personal_info");
    }
 
    async getSession(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);  
        return await this.#runRequest("session", qs);
    }

    async getSleep(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);  
        return await this.#runRequest("sleep", qs);  
    }

    async getTag(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);
        return await this.#runRequest("tag", qs);    
    }

    async getWorkout(qs) {
        validateQS(qs, ["start_date", "end_date", "next_token"]);
        return await this.#runRequest("workout", qs);  
    }
}

module.exports = Client;
