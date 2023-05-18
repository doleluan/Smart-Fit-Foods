import {Gender} from "../model/person/Gender";

export class UserEditDTO {
  id?:number;
  username?:string;
  avatar?:string;
  name?:string;
  email?:string;
  phone_number?:number;
  address?:string;
  gender?:Gender;
}
