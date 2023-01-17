import React,{useEffect, useState} from 'react'
import './Home.css'
import axios from "../axios"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearbanksData, fetchBanksData, selectBanksData } from '../features/bank/bankSlice';
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Home() {
const [prog, setProgress] = useState(0)
const [success, setSucess] = useState(false)
const hiddenFileInput = React.useRef(null);
const dispatch = useDispatch()
const banks = useSelector(selectBanksData)
const [bank, setBank] = useState("")

useEffect(() => {
  dispatch(fetchBanksData())

  return () => dispatch(clearbanksData())
}, [])



const config = {
    onUploadProgress: progressEvent => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(`File progress: ${progress}%`);
      setProgress(progress)
    }
  };

const navigate = useNavigate()
const handleFileChange = (e) => {

    setSucess(false)
    const file = e.target.files[0]
    if(file.type === "application/pdf"){
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bank',bank)
    
        axios.post('/pdf-files/', formData,config).then(response => {
        console.log(response);
        e.target.value = ""
        setSucess(true)
    }).catch(err => {
      alert(err.msg)
      e.target.value = ""
      setSucess(false)

    });
    }
    else{
        alert("Pdf file required")
    }
}

const handleClick = event => {
  if(bank.length> 0 ){
    hiddenFileInput.current.click();
  } 
  else{
    alert("Select Bank First")
  }
  
};

  return (
    <>
    <div className='main'>
        <div className='upload'>
           <Button onClick={handleClick} variant="outline-primary">Upload Statement</Button>{' '}
           <input type="file"ref={hiddenFileInput} onChange={(event) => handleFileChange(event)} hidden />
           
        </div>
        
        <DropdownButton id="dropdown-basic-button" title={bank.length > 0  ? bank :"Choose Bank"}>
          {banks?.map(item => <Dropdown.Item style={{width:"200px",textAlign:"center"}} onClick={() => setBank(item.name)}>{item.name}</Dropdown.Item>)}
        </DropdownButton>
        <Button style={{marginLeft:"10px"}} onClick={() => navigate('/banks/')} variant="outline-primary">Banks Statements</Button>
    </div>
    <div style={{position:"relative",left:"45%"}}>
            {prog ? <div className='bar'>
            
            <progress id="file" value={prog} max="100"> {prog}% </progress>
              <AiFillCloseCircle onClick={() => {
                setSucess(false)
                setProgress(0)}} size={15} />
              
              </div> : null}
            {success ? <p> Successfully file uploaded</p> : null}
      </div>
    </>
  )
}

export default Home