import { Axios } from "axios";
import axios from "../../axios"

export function fetchStatementsDataApi(id) {
      const result = axios.get(`/statements/${id}`)
      .then((response) => {
        return response
      }, (error) => {
        
        return error
      });
      return result    
   
  }

  export function fetchCustomerDataApi() {
    let AuthStr = localStorage.getItem('token')
    if(AuthStr){
        const result = axios.get(`http://93.186.202.34:8001/salescustomer/getcustomershortbycompanyid/67078ef6-d3ef-4de3-b9d1-fba5c14c1ddd/`,
        { 'headers': { 'Authorization': AuthStr }} )
        .then((response) => {
        return response
        }, (error) => {
        
        return error
        });
        return result   
    }
    else{
        alert("No Auth")
    }
     
 
}

export function fetchVendorsDataApi() {
  let AuthStr = localStorage.getItem('token')
  if(AuthStr){
      const result = axios.get(`http://93.186.202.34:8001/purchase/getvendor/`,
      { 'headers': { 'Authorization': AuthStr }} )
      .then((response) => {
      return response
      }, (error) => {
      
      return error
      });
      return result   
  }
  else{
      alert("No Auth")
  }
   


}



export function fetchVendorBillsDataApi(vendorId) {
  let AuthStr = localStorage.getItem('token')
  if(AuthStr){
      const result = axios.get(`http://93.186.202.34:8001/purchase/getbillbyvendorid/${vendorId}`,
      { 'headers': { 'Authorization': AuthStr }} )
      .then((response) => {
      return response
      }, (error) => {
      
      return error
      });
      return result   
  }
  else{
      alert("No Auth")
  }
   

}

export function fetchCustomerInvoicesDataApi(customerId) {
  let AuthStr = localStorage.getItem('token')
  if(AuthStr){
      const result = axios.get(`http://93.186.202.34:8001/salescustomer/getinvoicebycustomerid/${customerId}`,
      { 'headers': { 'Authorization': AuthStr }} )
      .then((response) => {
      return response
      }, (error) => {
      
      return error
      });
      return result   
  }
  else{
      alert("No Auth")
  }
   

} 

export async function SubmitBillInvoice(data,handleClose) {
  let AuthStr = localStorage.getItem('token')
  if(AuthStr){
      const result = await axios.post(`/transactions/`,data,
      { 'headers': { 'Authorization': AuthStr }} )
      .then((response) => {
        alert("Successfully Posted data")
        handleClose()
      return response.data
      }, (error) => {
        alert(error.message)
        handleClose()
      return error
      });
      return result   
  }
  else{
      alert("No Auth")
  }
   

}