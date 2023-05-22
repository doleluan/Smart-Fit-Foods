import {Gender} from "./Gender";
import {Account} from "./Account";
export class User{
  id?:number
  name?:string
  avatar?:string
  phone_number?:number
  address?:string
  gender?:Gender
  username:Account;
}
