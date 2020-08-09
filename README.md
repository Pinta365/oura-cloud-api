## OURA-CLOUD-API
This lib was created for my own personal use, putting it up in case anyone else is in need of the same :)
Since it's for personal use it only support authentication with access-token, might add OAuth in the future.

Login to the [Oura Cloud](https://cloud.ouraring.com/) with your Oura credentials and create an [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens).  
Details around what information the  API can return is found here: [Oura Cloud API](https://cloud.ouraring.com/docs/) 

### Installation
>npm install oura-cloud-api

### Example
Replace the accessToken below with your own personal access token found at [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens)
```javascript
const Client = require('oura-cloud-api');

(async () => {
    
    const accessToken = 'RDEOSTZPD4...';
    
    try {
        const client = new Client(accessToken);
        
        const userInfo  = await client.getUserInfo();
        console.log(`The call returned: ${JSON.stringify(userInfo)}`);
        
        const sleep  = await client.getReadinessSummaries({ start: '2020-01-15', end: '2020-01-20' });
        console.log(`The call returned: ${JSON.stringify(sleep)}`);
       
    } catch (error) {

        console.log(`Oh-no, error occured: ${error}`);

    }

})();
```

### Available methods

returns the user object.
>getUserInfo()

>getPersonalInfo()

With the summary methods you can supply start and end dates in the format 'YYYY-MM-DD', as seen in the example above.
>getSleepSummaries({start, end})

>getActivitySummaries({start, end})

>getReadinessSummaries({start, end})

This method returns an object with the above three summary methods in the format of: {sleep:[], activity:[], readiness:[]}.
>getSummaries({start, end})