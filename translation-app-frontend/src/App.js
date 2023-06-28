import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('te');
  const [translatedText, setTranslatedText] = useState('');
  const [audioFile, setAudioFile] = useState('');

  const languages = [
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'te', name: 'Telugu' },
    { code: 'ar', name: 'Arabic' },
    // Add more languages here
  ];

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const translationResponse = await axios.post('http://localhost:5000/api/translate', {
        text: inputText,
        targetLanguage: selectedLanguage,
      });
      const { translatedText, audioFile } = translationResponse.data;
      setTranslatedText(translatedText);
      setAudioFile(`http://localhost:5000/${audioFile}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayAudio = () => {
    const audioElement = new Audio(audioFile);
    audioElement.play().catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="App" style={{position:"absolute",top:"20%",left:"40%",maxWidth:"500px",textAlign:"center"}}>
      <h1 style={{marginBottom:"20px",fontSize:"50px"}}>TRANSLATION APP</h1>
      <form onSubmit={handleSubmit}>
        <textarea style={{display:"block",marginBottom:"15px",fontSize:"20px"}} value={inputText} onChange={handleChange} rows={4} cols={51} placeholder='Enter your text here'/>
        <select className="form-select" value={selectedLanguage} onChange={handleLanguageChange} style={{display:"block",marginBottom:"10px",fontSize:"20px",fontWeight:"bold",textAlign:"center"}}>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <button style={{fontSize:"20px",width:"500px"}} className="btn btn-primary btn-block" type="submit">Translate</button>
      </form>
      {translatedText && (
        <>
          <p style={{fontSize:"20px",margin:"30px 0",border:"2px solid black",padding:"5px",height:"150px",overflowY:"scroll"}}>{translatedText}</p>
          {audioFile && (
            <div>
              <button className="btn btn-primary btn-block" style={{fontSize:"20px",width:"500px"}} onClick={handlePlayAudio}>Play</button>
              <button className="btn btn-primary btn-block" style={{display:"block",marginTop:"10px",width:"500px"}} download>
              <a style={{textDecoration:"none",color:"white",textAlign:"center",fontSize:"20px"}} href={audioFile} download>
                Download Audio
              </a>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
