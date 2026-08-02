import {  authReducer } from "./Redux/AuthReducer/reducer";
import store from "./Redux/store"
export type ProductObject = {
   id:number | string;
   name:string;
   price:number;
   about:string;
   category:string;
   brand:string;
   rating:number;
   avatar:string;
   info?:string;
}
export type Options= {
   year: string,
   month: string,
   day: string,
}

export type UserObject ={
name:string;
email:string;
address:any;
password?:string;
id?:number | string;
role?: string;
addToCart:ProductObject[];
orderPlaced:ProductObject[];
}

export interface UserObjectNew {
   name:string;
   email:string;
   
   password?:string;
   id?:number | string;
   addToCart:ProductObject[];
   orderPlaced:ProductObject[];
   }

export type RootauthState = ReturnType<typeof authReducer  >;



export {}
