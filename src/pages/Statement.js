import React,{useState,useEffect, useRef} from 'react'
import './Statement.css'
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { clearstatementsData, fetchCustomerData, fetchStatementsData, fetchVendorsData, selectDataFound, selectStatementsData, selectStatus, selectVendors } from '../features/statement/statementSlice';
import ParticularModal from '../components/ParticularModal';
import {useLocation,useNavigate} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Statement() {

  const dispatch = useDispatch()
  const result = useSelector(selectStatementsData)
  const dataFound = useSelector(selectDataFound)
  const location = useLocation();
  const [particularDetail, setParticularDetail] = useState({})
  const navigate = useNavigate()
  const particularRef = useRef();
  const status = useSelector(selectStatus)


  useEffect(() => {
    const statement_id = location?.state?.id
   

    if (statement_id){
      dispatch(fetchStatementsData(statement_id))
      dispatch(fetchCustomerData())
      dispatch(fetchVendorsData())
    }
    else{
      navigate('/banks/')
    }
    return () => {
        dispatch(clearstatementsData())
    }
  }, [])


 
  return (
    <div className='statements'>
    
        {status === "loading" ? <Spinner className='loading__spinner'  animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner> : null}
    {
      result?.length > 0 ? 
    
    <Table style={{textAlign:"center",margin:"10px",position:"absolute"}} striped bordered hover>

      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Date</th>
          <th>Description</th>
          <th>Reference</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Particular</th>
          <th>Balance</th>
        </tr>
      </thead>
      
      <tbody>
            {
              result?.map((statement,index) => {
                return (
                  <tr key={index}>
                      <td>{index+1}</td>
                      <td>{statement.date}</td>
                      <td>{statement.description}</td>
                      <td>{statement.reference}</td>
                      <td>{statement.debit}</td>
                      <td>{statement.credit}</td>
                      <td style={{cursor:"pointer"}} onClick={() => {
                        
                        setParticularDetail(statement)
                        
                        particularRef.current.openModal()
                        
                      }                    
                        }>
                           Select Particular
                      </td>
                      <td >{statement.balance}</td>
                  </tr>
                )
              })
            }  
      </tbody>
    </Table>

         :null }
         {dataFound === false ? <h1 className="no__result">No Result</h1> : null}
    <div className='particular-modal'>
      <ParticularModal particularDetail={particularDetail} setParticularDetail={setParticularDetail}  ref={particularRef}/>
    </div>
    </div>
  )
}

export default Statement