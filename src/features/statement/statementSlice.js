import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCustomerDataApi, fetchCustomerInvoicesDataApi, fetchStatementsDataApi, fetchVendorBillsDataApi, fetchVendorsDataApi } from './statementAPI';

const PAGE_SIZE = 10;
    
const initialState = {
  statementsResult: [],
  customerNames:[],
  vendorsNames:[],
  dataFound:null,
  currentBillDataFound : null,
  status: 'idle',
  currentBillStatus:'idle',
  currentVendorBills:[],
  currentCustomerInvoice:[]
};

export const fetchStatementsData = createAsyncThunk(
    'statements/fetchStatementsData',
    async (id) => {
      
      const response = await fetchStatementsDataApi(id)
    
      return response.data
    }
  );
  export const fetchCustomerData = createAsyncThunk(
    'statements/fetchCustomerData',
    async () => {
      const response = await fetchCustomerDataApi()
        // console.log(response)
      return response.data
    }
  );

  export const fetchVendorsData = createAsyncThunk(
    'statements/fetchVendorsData',
    async () => {
      const response = await fetchVendorsDataApi()
        // console.log(response)
      return response.data
    }
  );

  
  export const fetchVendorBillsData = createAsyncThunk(
    'statements/fetchVendorBillsData',
    async (vendor_id) => {

      const response = await fetchVendorBillsDataApi(vendor_id)
        // console.log(response)
      return response.data
    }
  );

  export const fetchCustomerInvoicesData = createAsyncThunk(
    'statements/fetchCustomerInvoicesData',
    async (customer_id) => {

      const response = await fetchCustomerInvoicesDataApi(customer_id)

      return response.data
    }
  );

  
  export const statementsSlice = createSlice({
    name: 'statements',
    initialState,
    reducers: {
      clearstatementsData: (state) => initialState,
      clearCurrentBillData:(state) => {
        state.currentVendorBills = []
        state.currentCustomerInvoice = []
      }
    },
      

    extraReducers: (builder) => {
      builder
        .addCase(fetchStatementsData.pending, (state) => {
        
          state.status = 'loading';
         
        })
        .addCase(fetchStatementsData.fulfilled, (state, action) => {
          state.status = 'idle';
          if(Object.keys(action.payload).length === 0){
            state.dataFound = false
          }
          else{
            state.dataFound = true
          }
          state.statementsResult = action.payload;
        })
        builder
        .addCase(fetchCustomerData.pending, (state) => {
        
            state.status = 'loading';
           
          })
        .addCase(fetchCustomerData.fulfilled, (state, action) => {
            state.customerNames = action.payload;
          })
          builder
          .addCase(fetchVendorsData.pending, (state) => {
          
              state.status = 'loading';
             
            })
          .addCase(fetchVendorsData.fulfilled, (state, action) => {
              state.vendorsNames = action.payload;
            })
            builder
          .addCase(fetchVendorBillsData.pending, (state) => {
          
              state.currentBillStatus = 'loading';
             
            })
          .addCase(fetchVendorBillsData.fulfilled, (state, action) => {
            state.currentBillStatus = 'idle';
            if(Object.keys(action.payload.vendor_bills).length === 0){
              state.currentBillDataFound = false
            }
            else{
              state.currentBillDataFound = true
            }
              state.currentVendorBills = action.payload.vendor_bills;
            })
            builder
          .addCase(fetchCustomerInvoicesData.pending, (state) => {
          
              state.currentBillStatus = 'loading';
             
            })
          .addCase(fetchCustomerInvoicesData.fulfilled, (state, action) => {
            state.currentBillStatus = 'idle';
            if(Object.keys(action.payload.customer_invoices).length === 0){
              state.currentBillDataFound = false
            }
            else{
              state.currentBillDataFound = true
            }
              state.currentCustomerInvoice = action.payload.customer_invoices;
            })
        
    },
  });

  export const { clearstatementsData,clearCurrentBillData } = statementsSlice.actions;

  


  export const selectStatementsData = (state) => state.statements.statementsResult;
  export const selectCustomers = (state) => state.statements.customerNames
  export const selectVendors = (state) => state.statements.vendorsNames
  export const selectVendorBills = (state) => state.statements.currentVendorBills
  export const selectCustomerInvoice = (state) => state.statements.currentCustomerInvoice
  export const selectStatus = (state) => state.statements.status;
  export const selectcurrentBillStatus = (state) => state.statements.currentBillStatus;
  export const selectcurrentBillDataFound = (state) => state.statements.currentBillDataFound
  export const selectDataFound = (state) => state.statements.dataFound
  export default statementsSlice.reducer;