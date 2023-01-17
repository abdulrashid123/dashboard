
import axios from "../../axios"

export function fetchBanksDataApi() {
      const result = axios.get(`/banks/`)
      .then((response) => {
        return response
      }, (error) => {
        
        return error
      });
      return result    
   
  }

  export function fetchStatementUploadDataApi() {
    const result = axios.get(`/statementUpload/`)
    .then((response) => {
      return response
    }, (error) => {
      
      return error
    });
    return result    
 
}