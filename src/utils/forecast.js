const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=af14717faa12ef3d60a08c64d1ff27df&query=' + latitude + ',' + longitude + '&units=f'
    request({url,json:true},(error,{body})=>
    {
        if(error)
            callback('Unable to connect to weather services',undefined)
        else if(body.error)
            callback('No information available for the input',undefined)
        else
            console.log(body.current.temperature),
            callback(
                undefined,
                {
                    temp: 'It is '+ body.current.temperature +' degrees outside',
                    
                }
            ) 
    })
}
module.exports = forecast