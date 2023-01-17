import React, { useEffect,useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import { Navigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './QrCode.css'

function QrCode() {
const [data, setData] = useState(null);
const [found,setFound] = useState(false)
useEffect(() => {
  
    if(navigator.getUserMedia){
        navigator.getUserMedia(
        {
          video: true
        }, 
        function(localMediaStream){}, 
        function(err){
          alert('The following error occurred when trying to access the camera: ' + err); 
        }
      );
      } else {
        alert('Sorry, browser does not support camera access');
      }
}, [])

const handleScan = (data) => {
    console.log(data)
    if(data){
        navigator.vibrate(200)
        setData(data)
        setFound(true)
    }
}

  return (
    <div className="qr__code">
    {!found ? <QrReader
        delay={300}
        facingMode={"environment"}
        onError={(err) => console.log(err)}
        onScan={(data) =>handleScan(data)}
        style={{ width:'90%',margin:"5px"}}
    /> : null}
    <Button style={{margin:"5px"}} onClick={() => {
        setData(null)
        setFound(false)}}> Scan another</Button>
    <a  style={{margin:"5px"}} href={data}  target="_blank">{data}</a>
  </div>
  )
}

export default QrCode