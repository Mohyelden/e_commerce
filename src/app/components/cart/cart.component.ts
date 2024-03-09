import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
constructor(private _CardService:CardService){}
cartDetails:any={};
   
removeCartItem(id:string):void{
  this._CardService.removeItem(id).subscribe({
     next:(response)=>{
      this.cartDetails=response.data;
      
     },
     error:(err)=>{
      console.log(err);
      
     }
  })
}

changeCount(id:string,count:number):void{
  if(count>0){
    this._CardService.updateCartProduct(id,count).subscribe({
      next:(response)=>{
        this.cartDetails=response.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
ngOnInit(): void {
    this._CardService.getUserCart().subscribe({
      next:(response)=>{
            this.cartDetails=response.data;
            
      },
      error:(err)=>{
console.log(err);

      }
    })
}


}
