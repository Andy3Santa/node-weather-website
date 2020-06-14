const request=require('postman-request');

const forecast=(lat,long,callback)=>{


    const murl = 'http://api.weatherstack.com/current?access_key=803ce56423c17d5e8c38fa9c07637e89&query='+ encodeURIComponent(lat)+',%20'+ encodeURIComponent(long)

    request({url:murl, json:true}
        ,(error,{body})=>{
        if(error){
            callback('Unable to connect', undefined)

        }
        else if(body.error){
            callback('Unable to find location. Try another ',undefined)

        }
        else{
            callback(undefined,body.current.weather_descriptions[0] ,' It is currently ',body.current.temperature,' degrees but, there is ',body.current.precip,' chance of rain')//{

           
        }
        })


}

module.exports= forecast