import React,{useEffect,forwardRef,useState,useImperativeHandle } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentBillData, fetchCustomerInvoicesData, fetchVendorBillsData, selectcurrentBillDataFound, selectcurrentBillStatus, selectCustomerInvoice, selectCustomers, selectVendorBills, selectVendors } from '../features/statement/statementSlice';
import './ParticularModal.css'
import Alert from 'react-bootstrap/Alert';
import { SubmitBillInvoice } from '../features/statement/statementAPI';

const ParticularModal = forwardRef((props,ref) => {

    const [show, setShow] = useState(false);
    const [nameId, setNameId] = useState("")
    const [name, setName] = useState("")
    const [nameList,setNameList] =  useState([])
    const vendors = useSelector(selectVendors)
    const currentBillStatus =  useSelector(selectcurrentBillStatus)
    const currentBillDataFound = useSelector(selectcurrentBillDataFound)
    const customers = useSelector(selectCustomers)
    const invoices = useSelector(selectCustomerInvoice)
    const bills = useSelector(selectVendorBills)
    const [amount, setAmount] = useState(0)
    const [actualAmount, setActualAmount] = useState()
    const [bill, setBill] = useState(true)
     const [submitData,setSubmitData] = useState([])
    const dispatch = useDispatch()
   
    useEffect(() => {
      
        setActualAmount(props.particularDetail.debit  ? props.particularDetail.debit : props.particularDetail.credit)
        setBill(props.particularDetail.debit ? true : false)
        
    }, [show])
    
    
    useImperativeHandle(ref, () => ({

        openModal(){
            setShow(true)
        } 
      }));

const handleClose = () => {
    setShow(false)
    setNameList([])
    setNameId("")
    setName("")
    dispatch(clearCurrentBillData())
    props.setParticularDetail({})
    setAmount(0)
    setActualAmount(0)
    setSubmitData([])

    
}

const handleChange = (e) => {
    let val = e.target.value
    setName(val)
    if(props.particularDetail.debit > 0) {
        let lst = vendors?.filter(name => name.vendor_name.startsWith(val))
        setNameList(lst)
    }
    else{
        let lst = customers?.filter(name => name.customer_name.startsWith(val))
        setNameList(lst)
    }
    
    
}

const handleCheck = (e) => {
    if(e.target.checked){
        let amt = parseFloat(e.target.value)
        setAmount(prev => {
            
           return prev+amt
        } )
        let invoiceId = e.target.name
        let sample = {statement:props.particularDetail.id,invoiceId,amount:amt}
        setSubmitData([...submitData,sample])
    }
    else{
        let invoiceId = e.target.name
        let val = 0
        submitData.map(item => {
            if(invoiceId !== item.invoiceId) {
                
                val += item.amount
            }
            
        })
        setAmount(val)
        setSubmitData(current => current.filter(item => item.invoiceId !== invoiceId))
    }

    

    
}

const handleSubmit = () => {
    if(submitData.length === 0){
        alert(bill ? "Bill Not Selected": "Invoice Not Selected")
    }
    else{
        if(amount <= actualAmount){
            console.log(submitData)
            SubmitBillInvoice(submitData,handleClose)
        }
        else{
            alert("Amount is more than actual amount")
        }
        
    }
    
}

  return (
    <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          <div className='modalHead'>
             {bill  ? "Expense" : "Income"}
             
          </div>
          <div className='modalHead'>
             Total Amount : {actualAmount} 
             
          </div>
          <div className='modalHead'>
             Selected Amount : {amount} 
             {amount > actualAmount ? <Alert  style={{fontSize:"15px"}} key="warning" variant="warning">
                Total amount is greater than actual amount
            </Alert> : null}
          </div>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleChange}
                    placeholder= {bill ? "Search Vendor Name" : "Search Customer Name"}
                    autoFocus
                />
                <div className='autocomplete'>
                {
                    nameList?.map(item => (
                        <p className='autocomplete__item' onClick={() => {
                                if(props.particularDetail.debit > 0){
                                    setNameId(item.vendor_id)
                                    setName(item.vendor_name)
                                    dispatch(fetchVendorBillsData(item.vendor_id))
                     
                                }
                                else{
                                    setNameId(item.customer_id)
                                    setName(item.customer_name)
                                    dispatch(fetchCustomerInvoicesData(item.customer_id))
                                }
                                setNameList([])
                                
                        }}>
                            {props.particularDetail.debit > 0 ? item.vendor_name : item.customer_name}
                        </p>
                    ))
                }
                {
                    props.particularDetail.debit > 0 ? 
                    bills?.map(item => (
                        <div className='bills'>
                            <input 
                            onChange={handleCheck}
                            className="autocomplete__input" type="checkbox" name={item.bill_serial} value={item.total} />
                            <label className='autocomplete__label'>
                                {item.bill_serial}
                            </label>
                        </div>
                    )):
                    invoices?.map(item => (
                        <div className='bills'>
                            <input 
                            onChange={handleCheck}
                            className="autocomplete__input" type="checkbox" name={item.invoice_serial} value={item.total} />
                            <label className='autocomplete__label'>
                                {item.invoice_serial}
                            </label>
                        </div>
                    ))
                }
                <div style={{display:"flex",justifyContent:"center"}} className='bills'>
                {currentBillStatus === "loading" ?     
                <Spinner  animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :null}
                    {currentBillDataFound == false ?  <h2>No {bill ? "Bills" : "Invoices"}</h2> : null}
                </div>
                </div>
                </Form.Group>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
      </Modal>
  )
})

export default ParticularModal