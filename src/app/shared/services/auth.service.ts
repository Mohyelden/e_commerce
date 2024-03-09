import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any;
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

logout():void{
localStorage.removeItem('eToken');
this._Router.navigate(['/login']);
}

saveUserData(){
  if(localStorage.getItem('eToken') != null){
  let enCodeToken:any=  localStorage.getItem('eToken');
  let decCodeToken=jwtDecode(enCodeToken);
  this.userData=decCodeToken;
  // console.log(decCodeToken);
  
  }
}

  setRegister(userData:object):Observable<any>{
  return  this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData)
  }

  setLogin(userData:object):Observable<any>{
    return  this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
    }
}
