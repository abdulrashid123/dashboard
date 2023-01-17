import React,{useState} from 'react'
import {SubMenu, Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import './Menu.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorBillsData, selectCustomers, selectVendorBills, selectVendors } from '../features/statement/statementSlice';
import { Button } from 'react-bootstrap';

function DropDownMenu() {
    const customers = useSelector(selectCustomers)
    const currentvendorBills = useSelector(selectVendorBills)
    const [customerList,setCustomerList] =  useState([])
    const vendors = useSelector(selectVendors)
    const [vendorList,setVendorList] =  useState([])
    const [vendor, setVendor] = useState("")
    const [customer, setCustomer] = useState("")
    const [display, setDisplay] = useState(false)
    const dispatch = useDispatch()

   const searchCustomers = (val) => {
    let lst = customers?.filter(name => name.customer_name.startsWith(val))
    setCustomerList(lst)
   }

   const searchVendors = (val) => {
    let lst = vendors?.filter(name => name.vendor_name.startsWith(val))
    setVendorList(lst)
   }
  return (
<Menu menuButton={<MenuButton>Select Particular</MenuButton>}>
    
    <SubMenu label="Expense">
        <SubMenu label="Bills">
        <div style={{display:"flex"}}>
            {display ? <div  classname="customer">

                {currentvendorBills?.map((item,index) => (
                    <div style={{display:"flex",padding:"5px"}}>
                        <input type="checkbox" id={item.bill_id} name="vehicle1" value={item.bill_serial} />
                        <p 
                        label={item.bill_id}
                        onClick={() => {
                            // dispatch(fetchVendorBillsData(item.vendor_id))
                           }}
                        key={index} className='items'>{item.bill_id}
                        </p>
                    </div>
                ))}
                <Button onClick={()  => setDisplay(false)} style={{position:"relative",left:"35%"}}>Submit</Button>
            </div>
            
            : <div className='customer'>
                
                <input
                placeholder='Search by vendors name'
                onChange={e => searchVendors(e.target.value)}
                id="searchBox" type="text" />
                {vendorList?.map((item,index) => (
                    <p 
                    label={item.customer_name}
                    onClick={() => {
                        dispatch(fetchVendorBillsData(item.vendor_id))
                        setVendor(item.vendor_id)
                        setDisplay(true)
                    }}
                    key={index} className='items'>{item.vendor_name}
                    </p>
                ))}
            </div>
            }
            
        </div>
        </SubMenu>
        <SubMenu label="Voucher">
            <MenuItem>about.css</MenuItem>
            <MenuItem>home.css</MenuItem>
            <MenuItem>index.css</MenuItem>
        </SubMenu>
    </SubMenu>
    <SubMenu label="Income">
        <SubMenu label="Invoice">
            <div className='customer'>
                
                <input
                placeholder='Search by customer name'
                onChange={e => searchCustomers(e.target.value)}
                id="searchBox" type="text" />
                {customerList?.map((item,index) => (
                    <p 
                    onClick={() => setCustomer(item.customer_id)}
                    key={index} className='items'>{item.customer_name}</p>
                ))}
            </div>
        </SubMenu>
        <SubMenu label="Voucher">
            <MenuItem>about.css</MenuItem>
            <MenuItem>home.css</MenuItem>
            <MenuItem>index.css</MenuItem>
        </SubMenu>
    </SubMenu>
    
</Menu>
  )
}

export default DropDownMenu