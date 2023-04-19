import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const config= new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openAi = new OpenAIApi(config)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async(req,res)=>{
    res.status(200).send({
        message: 'hello from codex',
    })
});

app.post('/', async(req,res)=>{
    try{
        const prompt = req.body.prompt;
        console.log(prompt)
        const response = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 0,
            frequency_penalty: 0.5,
            presence_penalty: 0,

        });
        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch(error){
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(3000, ()=>console.log("server running on port 3000"))