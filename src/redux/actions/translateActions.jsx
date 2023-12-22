import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant/constant";

export const getLanguages=createAsyncThunk("getLanguages",async()=>{
    const res=await axios.request(options)
    const data=res.data.data.languages
    const refinedData=data.map((i)=>({
        value:i.code,
        label:i.name,
    }))
    return refinedData
})

export const translateText = createAsyncThunk(
    'translate',
    async (params) => {
      
      const encodedParams = new URLSearchParams();
      encodedParams.set('source_language', params.sourceLang.value);
      encodedParams.set('target_language', params.targetLang.value);
      encodedParams.set('text', params.text);
  
      const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '5ab2ad600cmsh0fb57e0bb5a57b0p16d4f0jsndfb5cdaaaba6',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
      };
  
     
      const res = await axios.request(options);
  
      
      return res.data.data.translatedText;
    }
  );
