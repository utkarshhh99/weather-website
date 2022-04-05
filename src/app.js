const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sitapur'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Sitapur',
        name:'Utkarsh'
        
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is a help page',
        title:'Help',
        name:'Utkarsh'
        
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('You need to provide an address.')
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
                return res.send({error})
            res.send({location:place, temperature:forecastData.temp})
            console.log(place)
            console.log(forecastData)
        })
    })




    
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Article not found',
        title:'404',
        name:'Utkarsh'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found',
        title:'404',
        name:'Utkarsh'
    })
})
app.listen(3000,()=>{
    console.log('Server is running')
})