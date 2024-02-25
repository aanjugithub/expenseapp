import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl="http://127.0.0.1:8000/api/v1/transactions/"
  constructor(private http:HttpClient) { }

  getTransactions(){
    return this.http.get(this.baseUrl)
  }


  retrieveTransactiondetail(id:any){
    return this.http.get(`${this.baseUrl}${id}/`)
  }


  addTransaction(data:any){
    return this.http.post(this.baseUrl,data)
  }


  updateTransaction(id:Number,data:any){
      return this.http.put(`${this.baseUrl}${id}/`,data)
  }


  deleteTransaction(id:Number){
    return this.http.delete(`${this.baseUrl}${id}/`)
  }
}
