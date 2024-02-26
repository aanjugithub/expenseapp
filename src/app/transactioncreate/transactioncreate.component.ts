import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-transactioncreate',
  templateUrl: './transactioncreate.component.html',
  styleUrls: ['./transactioncreate.component.css']
})
export class TransactioncreateComponent {
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
    this.services.addTransaction(data).subscribe(data=>console.log(data));
    

    
  }

}
