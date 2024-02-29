import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent implements OnInit{

  isEdit:boolean=false
  instanceId:any
  title:string="addtransaction"
  categories =['food','fuel','entertainment','bills','rent','emi','miscellaneous']
  constructor(private services:ExpenseService){

  }
  transactionForm = new FormGroup({
    "title":new FormControl("",Validators.required),
    "type":new FormControl("",Validators.required),
    "category":new FormControl("",Validators.required),
    "amount":new FormControl("",Validators.required),
    "user":new FormControl("",Validators.required),
  })

  addTransaction(){
    let data=this.transactionForm.value;

    if(this.isEdit){
      //perform edit bz flag is true
      this.services.updateTransaction(this.instanceId,data).subscribe(data=>{
        console.log(data)
        this.transactionForm.reset()
        this.isEdit=false
    }
      )
      

    }
    else{
      //perform add data if isedit=false
      this.services.addTransaction(data).subscribe(data=>console.log(data));
      this.transactionForm.reset()
      
    }
    

    
  }
  ngOnInit(): void {
    this.services.emitTransactionId.subscribe((id:any)=>{
      this.isEdit=true
      this.title="edit_transaction"
      this.instanceId=id
      this.services.retrieveTransactiondetail(id).subscribe(data=>this.transactionForm.patchValue(data))
    })
     
  }

}
