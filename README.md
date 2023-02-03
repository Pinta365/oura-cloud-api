
---
> **Warning**
>
> Development of this repository has been stopped.
> Check out this [Deno repository](https://github.com/Pinta365/oura_api) for future changes and updates.
>
> **Warning**

---


## OURA-CLOUD-API (updated for v2 of the API)
This lib was created for my own personal use, putting it up in case anyone else is in need of the same :)
Since it's for personal use it only support authentication with access-token, might add OAuth in the future.

Login to the [Oura Cloud](https://cloud.ouraring.com/) with your Oura credentials and create an [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens).  
Details around what information the  API can return is found here: [Oura Cloud API v2](https://cloud.ouraring.com/v2/docs) 

### Installation
>npm install oura-cloud-api

### Example
Replace the accessToken below with your own personal access token found at [Personal Access Token](https://cloud.ouraring.com/personal-access-tokens)
```javascript
const Client = require("oura-cloud-api");

(async () => {
    
    const accessToken = "RDEOSTZPD4...";
    
    try {
        const client = new Client(accessToken);
        
        const userInfo  = await client.GetPersonalInfo();
        console.log(`The call returned: ${JSON.stringify(userInfo)}`);
        
        const sleep  = await client.getDailyReadiness({ start_date: "2022-08-15", end_date: "2022-08-16" });
        console.log(`The call returned: ${JSON.stringify(sleep)}`);
       
    } catch (error) {

        console.log(`Oh-no, error occured: ${error}`);

    }

})();
```

### Available methods

returns users personal information  (e.g. age, email, weight, and height)
>GetPersonalInfo()

For the following methods you optionally supply start_date and end_date as an object parameter to specify a time frame ex { start_date: "2022-08-15", end_date: "2022-08-16" }. Previous day will be used if parameter is omitted. 
>getDailyActivity()

>getDailyReadiness()

>getDailySleep()

>getSession()

>getSleep()

>getTag()

>getWorkout()

For the following methods you optionally supply start_datetime and end_datetime as an object parameter to specify a time frame ex { start_datetime: "2022-08-15T00:00:00", end_datetime: "2022-08-17T00:00:00" }. Previous day will be used if parameter is omitted.
>GetHeartrate()
