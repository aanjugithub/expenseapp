import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Subject,tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl="http://127.0.0.1:8000/api/v1/transactions/"

  refreshRequired =new Subject()

  emitTransactionId = new Subject()

  constructor(private http:HttpClient) { }

  getTransactions(){
    return this.http.get(this.baseUrl)
  }


  retrieveTransactiondetail(id:any){
    return this.http.get(`${this.baseUrl}${id}/`)
  }


  addTransaction(data:any){
    return this.http.post(this.baseUrl,data).pipe(tap(data=>this.refreshRequired.next(true)))
  }


  updateTransaction(id:Number,data:any){
      return this.http.put(`${this.baseUrl}${id}/`,data).pipe(tap(data=>this.refreshRequired.next(true)))
      //.pipe is used to automatic update on list side when we edit 
  }


  deleteTransaction(id:Number){
    return this.http.delete(`${this.baseUrl}${id}/`)
  }


// for passing transaction id to subscriber
  dispatchTransactionId(id:any){
    this.emitTransactionId.next(id)
  }
}
