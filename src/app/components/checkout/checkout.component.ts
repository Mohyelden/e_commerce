import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit {
constructor(private _FormBuilder:FormBuilder,private _ActivatedRoute:ActivatedRoute,private _CardService:CardService){}
cartId:any='';

checkout:FormGroup=this._FormBuilder.group({
  details:[''],
  phone:[''],
  city:['']
})
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
console.log(params.get('id'));
this.cartId=params.get('id');
      }
    })
}
handleform():void{
  console.log(this.checkout.value);
  this._CardService.checkout(this.cartId,this.checkout.value).subscribe({
    next:(response)=>{
if(response.status=="success"){
  window.open(response.session.url,'_self');
}

    }
  })
}
}
