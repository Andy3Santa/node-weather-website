const path = require('path')
const express= require('express')
const hbs= require('hbs')
//const request=require('postman-request');
const forecast= require('./utils/functiCall2.js')
const geocode= require('./utils/geoCode2.js')



console.log(__dirname)
console.log(path.join(__dirname,'../public'))


//directories
const viewsPath= path.join(__dirname,'../templates/views')

const publicDir= path.join(__dirname,'../public')

const publicDirHelp= path.join(__dirname,'../public/help.html')
const partialsPath= path.join(__dirname,'../templates/partials')



const app= express()
const weather = {temperature: 10,precipitation: 0.5}

// set views
app.set('view engine','hbs')


app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory
app.use(express.static(publicDir))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather Title',
        name:'Andy'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vony'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'MESSAGE',
        title: 'HeLp',
        name:'Andy Santama'
    })
})







app.get('/weather',(req,res)=> {


    if (!req.query.address){

        return res.send({
            error: 'There is an error with address'
        })

    }

    const address=req.query.address

    geocode(address,(error,{latitude, longitude, location}={})=>{
        //console.log('Error',error)
       // console.log('Data',data)
       if(error){
           return res.send(error) 

       }
    
        forecast(latitude,longitude, (error, data) => {
            if(error){
                return res.send(error)
     
            }
          


            res.send({
                forecast:data,
                Location:location,
                Latitude: latitude,
                Longitude:longitude,
                address: req.query.address
            })

           // console.log(location)

          //console.log('Data', data)
         })
        
    
    
    
    })

  

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'There is an error'
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})



app.get('/help/*',(req,res)=>{

    res.render('304',{
        title:'Error 404',
        name:'ERROR',
        errorMessage:'Help not found 404 Error'
    })
})

app.get('*',(req,res)=>{

    res.render('304',{
        title:'Error PAge',
        name:'ERROR',
        errorMessage:'404 Error'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
// domain app.com
// app.com/help
//app.com/about

