import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CardService } from 'src/app/shared/services/card.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService,private _CardService:CardService,private _ToastrService:ToastrService){}
productDetails:Product ={} as Product;
addcart(id:string):void{
  this._CardService.addToCart(id).subscribe({
    next:(response)=>{
  console.log(response);
  this._ToastrService.success(response.message)
    }
  })
  }
productSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
items:1,
  nav: true
}
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       let idProduct:any=   params.get('id');

       this._EcomdataService.getProductDetails(idProduct).subscribe({
        next:(response)=>{
console.log(response.data);
this.productDetails=response.data;
        }
       })
       console.log(idProduct);
       
      }
    })
}
}
