import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  msgError:string='';
  isLoading:boolean=false;
constructor(private _AuthService:AuthService,private _Router:Router){

}
registerform:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl('',[Validators.required,Validators.email] ),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z].{6,20}$/)]),
  rePassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z].{6,20}$/)]),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^(015|011|012|010)\d{8}$/)]),
},{validators:[this.confirmPassword]} as FormControlOptions);

confirmPassword(group:FormGroup):void{
  let password =group.get('password');
  let rePassword=group.get('rePassword');


  if(rePassword?.value==''){
    rePassword?.setErrors({required:true})
  }
  else if(password?.value !=rePassword?.value){
    rePassword?.setErrors({misMatch:true})
  }
}

handleform():void{

console.log(this.registerform.value);
if(this.registerform.valid){
  this.isLoading=true;
  this._AuthService.setRegister(this.registerform.value).subscribe({
    next:(response)=>{
 if(response.message=="success"){
  this.isLoading=false;

this._Router.navigate(['/login']);
 }
  
    },
    error:(err:HttpErrorResponse)=>{
  this.isLoading=false;

      console.log(err.error.message);
      this.msgError=err.error.message;
    }
  })
}
}
}
