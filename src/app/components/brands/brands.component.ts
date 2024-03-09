import { Component } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  constructor(private _EcomdataService:EcomdataService){}
  brands:any[]=[];
  ngOnInit(): void {
      this._EcomdataService.getAllBrands().subscribe({
        next:(response)=>{
           this.brands=response.data;
          console.log(this.brands);
  
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
}
