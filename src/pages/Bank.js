import React,{useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { clearbanksData, fetchBankStatementUploadData, selectBankStatus, selectBankUploadData, selectuploadDataFound } from '../features/bank/bankSlice';
import './Bank.css'
import {useNavigate} from "react-router-dom"
import { Spinner } from 'react-bootstrap';
function Bank() {
  const dispatch = useDispatch()
  const bankUploadData = useSelector(selectBankUploadData)
  const uploadStatus = useSelector(selectuploadDataFound)
  const status = useSelector(selectBankStatus)
  useEffect(() => {
    dispatch(fetchBankStatementUploadData())
  
    return () => dispatch(clearbanksData())
  }, [])
  
  const navigate = useNavigate()
  const handleRedirect = (id) => {
    navigate('/statements/',{state:{id:id}})
  }

  return (
    <div className='gridContainer'>  
        {uploadStatus ? bankUploadData?.map((item,index) => {
          return (
            <Card>
              <Card.Header>Uploaded At : {item.createdDate}</Card.Header>
              
              <Card.Body>
                <Card.Title>Bank Name : {item.bank.name} {item.startDate ? `(${item.startDate}, ${item.endDate})` : null}</Card.Title>
                <Card.Text>
                  {item.error && item.parse ? "File Already uploaded" : null}
                  {!item.error && item.parse ? "File Successfully parsed" : null}
                  {item.error && !item.parse ? "Error in parsing statement" : null}
                  {!item.error && !item.parse ? "Processing Statements" : null}
                  </Card.Text>
                <Button onClick={() => handleRedirect(item.id)} disabled={item.error ? true : false} variant="primary">Check Out Statement</Button>
              </Card.Body>
           </Card> 
          )
        }

        ) : null}
        {uploadStatus === false ? <h1 className="no__result">No Result</h1> : null}
        {status === "loading" ? <Spinner className='loading__spinner'  animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner> : null}
        
    </div>
        
    
    
    
    
  )
}

export default Bank