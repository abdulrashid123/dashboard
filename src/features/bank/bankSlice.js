import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBanksDataApi, fetchStatementUploadDataApi } from './bankAPI';


const PAGE_SIZE = 10;
    
const initialState = {
  bankResult:[],
  dataFound:null,
  status: 'idle',
  bankUpload:[],
  uploadDataFound:null,
};

export const fetchBanksData = createAsyncThunk(
    'banks/fetchBanksData',
    async () => {
      const response = await fetchBanksDataApi()
      // console.log(response)
      return response.data
    }
  );
  export const fetchBankStatementUploadData = createAsyncThunk(
    'banks/fetchBankStatementUploadData',
    async () => {
      const response = await fetchStatementUploadDataApi()
      console.log(response)
      return response.data
    }
  );




  
  export const banksSlice = createSlice({
    name: 'banks',
    initialState,
    reducers: {
      clearbanksData: (state) => initialState,
    },
      

    extraReducers: (builder) => {
      builder
        .addCase(fetchBanksData.pending, (state) => {
        
          state.status = 'loading';
         
        })
        .addCase(fetchBanksData.fulfilled, (state, action) => {
          state.status = 'idle';
          if(Object.keys(action.payload).length === 0){
            state.dataFound = false
          }
          else{
            state.dataFound = true
          }
          state.bankResult = action.payload;
        })
        builder
        .addCase(fetchBankStatementUploadData.pending, (state) => {
        
          state.status = 'loading';
         
        })
        .addCase(fetchBankStatementUploadData.fulfilled, (state, action) => {
          state.status = 'idle';
          if(Object.keys(action.payload).length === 0){
            state.uploadDataFound = false
          }
          else{
            state.uploadDataFound = true
          }
          state.bankUpload = action.payload;
        })
        
        
    },
  });

  export const { clearbanksData } = banksSlice.actions;

  


  export const selectBanksData = (state) => state.banks.bankResult;

  export const selectBankStatus = (state) => state.banks.status;
  export const selectBankUploadData = (state) => state.banks.bankUpload;
  export const selectuploadDataFound = (state) => state.banks.uploadDataFound;


  export default banksSlice.reducer;