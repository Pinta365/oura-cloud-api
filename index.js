'use strict';

const https = require('https');
const querystring = require('querystring');

class Client {

    constructor(access_token) {
        if (!access_token) {
            throw `Missing access token, check documentation.`;
        }
        this.access_token = access_token;
    }

    #call = (url, qs) => {

        var options = {
            method: 'GET',
            hostname: 'api.ouraring.com',
            port: 443,
            path: '/v1' + encodeURI(url) + (qs ? '?' + querystring.stringify(qs) : ''),
            headers: {
                'Authorization': 'Bearer ' + this.access_token
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, function (res) {

                if (res.statusCode < 200 || res.statusCode >= 300) {
                    reject(res.statusCode);
                }

                const parts = [];                
    
                res.on('data', function (part) {
                    parts.push(part);
                });
    
                res.on('end', function () {
                    try {
                        const data = JSON.parse(Buffer.concat(parts));
                        resolve(data); 
                    } catch (error) {
                        reject(error);
                    }
                       
                });
            });

            req.on('error', function (err) {
                reject(err);
            });
    
            req.end(); 

        });
    }

    #validateQueryString = (qs, allowedKeys) => {
        for (var key in qs) {
            if (qs.hasOwnProperty(key)) {
                if (allowedKeys.includes(key) === false) {
                    throw `Invalid parameter '${key}'.`;
                }
            }
        }
        return true;
    }

    async getUserInfo() {
        return await this.#call('/userinfo');
    }

    getPersonalInfo() {
        // Alias for getUserInfo.
        return this.getUserInfo();
    }

    async getSleepSummaries(qs) {
        this.#validateQueryString(qs, ['start', 'end']);
        const call = await this.#call('/sleep', qs);
        return call.sleep;
    }

    async getActivitySummaries(qs) {
        this.#validateQueryString(qs, ['start', 'end']);
        const call = await this.#call('/activity', qs);
        return call.activity;
    }

    async getReadinessSummaries(qs) {
        this.#validateQueryString(qs, ['start', 'end']);
        const call = await this.#call('/readiness', qs);
        return call.readiness;
    }

    async getSummaries(qs) {
        const sleep = await this.#call('/sleep', qs);
        const activity = await this.#call('/activity', qs);
        const readiness = await this.#call('/readiness', qs);

        return { sleep: sleep.sleep, activity: activity.activity, readiness: readiness.readiness };
    }
}

module.exports = Client; 
