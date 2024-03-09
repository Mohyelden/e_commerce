import { CardService } from './../../shared/services/card.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private _EcomdataService:EcomdataService ,private _CardService:CardService ,private _ToastrService:ToastrService){
}
products:Product[]=[];
Categories:any[]=[];
searchTerm:string='';

addcart(id:string):void{
this._CardService.addToCart(id).subscribe({
  next:(response)=>{
console.log(response);
  this._ToastrService.success(response.message)
  }
})
}


customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
mainSlider: OwlOptions = {
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
    this._EcomdataService.getAllproducts().subscribe({
      next:(response)=>{
        this.products=response.data;
console.log(this.products);
this._EcomdataService.getCategories().subscribe({
  next:(response)=>{
    this.Categories=response.data;
    
  }
})
      }
    })
}
}
