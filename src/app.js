import express from 'express'

const app= express()

app.get('/',(req,res)=>{
    res.send('Hey this is app page')
})


export{ app }