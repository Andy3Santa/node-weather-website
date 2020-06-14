const request= require('postman-request');


const url = 'http://api.weatherstack.com/current?access_key=803ce56423c17d5e8c38fa9c07637e89&query=-0.209892,%20-78.484232'
const purl= 'https://api.mapbox.com/geocoding/v5/mapbox.places/Quito.json?access_token=pk.eyJ1IjoiYW5keXNhbjMiLCJhIjoiY2tiMHk3ZHIyMDBibTJ4bjBuNndnZnZkbyJ9.LSV9uLMlqlzuNR-YkAZVFw'




const geocode=(address,callback)=>{

    const gurl= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5keXNhbjMiLCJhIjoiY2tiMHk3ZHIyMDBibTJ4bjBuNndnZnZkbyJ9.LSV9uLMlqlzuNR-YkAZVFw'

    request({url:gurl, json:true}
        ,(error,response)=>{
        if(error){
            callback('Unable to connect', undefined)

        }
        else if(response.body.features.length===0){
            callback('Unable to find location. Try another ',undefined)

        }
        else{
            callback(undefined,{

                latitude: response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name


            })
        }
        })

}

module.exports=geocode