import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLanguages, translateText } from '../redux/actions/translateActions'
import Select from 'react-select'
import { clearAnswer } from '../redux/slices/translateSlice'




const MainPage = () => {
    const state= useSelector((store)=>store.translateSlice)
    const dispatch=useDispatch()
   
    const [text,setText]=useState('')

    const [sourceLang,setSourceLang]=useState({
        value: 'tr',
        label: 'Turkish',
    })
    const [targetLang,setTargetLang]=useState({
        value: 'en',
        label: 'English',
    })

    useEffect(()=>{
        dispatch(getLanguages())
    },[])

    const handleChange=()=>{
        setTargetLang(sourceLang)
        setSourceLang(targetLang)

        setText('')
        dispatch(clearAnswer())
    }
    

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

  return (
    <div className='main-page'>
    <div className='container'>
    <h1>Çeviri +</h1>
        <div className='translate-area'>
            <div className='left'>
            <Select 
                value={sourceLang}
                isDisabled={state.isLoading} 
                onChange={(e)=>setSourceLang(e)}
                isLoading={state.isLoading}
                className='select' 
                options={state.languages} />
                <textarea 
                value={text}
                onChange={(e)=>setText(e.target.value)}
                ></textarea>
            </div>
            <button onClick={handleChange} className='change-btn'>Değiş</button>
            <div className='right'>
            <Select 
                value={targetLang}
                isDisabled={state.isLoading} 
                onChange={(e)=>setTargetLang(e)}
                isLoading={state.isLoading}
                className='select' 
                options={state.languages}
             />
                <textarea disabled value={state.answer}></textarea>
            </div>
        </div>
        <button onClick={()=>dispatch(translateText({sourceLang,targetLang,text}))} className='submit-btn'>Çevir</button>
    </div>    
    </div>
  )
}

export default MainPage