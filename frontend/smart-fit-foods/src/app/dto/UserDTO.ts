import {Gender} from "../model/person/Gender";
import {Roles} from "../model/person/Roles";

export class UserDTO {
  id?:number;
  username?:string;
  avatar?:string;
  name?:string;
  email?:string;
  phone_number?:number;
  address?:string;
  gender?:Gender;
  roles?:Roles[];
}
