const request=require('postman-request');

const forecast=(lat,long,callback)=>{


    const murl = 'http://api.weatherstack.com/current?access_key=803ce56423c17d5e8c38fa9c07637e89&query='+ encodeURIComponent(lat)+',%20'+ encodeURIComponent(long)

    request({url:murl, json:true}
        ,(error,response)=>{
        if(error){
            callback('Unable to connect', undefined)

        }
        else if(response.body.error){
            callback('Unable to find location. Try another ',undefined)

        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0] ,' It is currently ',response.body.current.temperature,' degrees but, there is ',response.body.current.precip,' chance of rain')//{

           
        }
        })


}

module.exports= forecast