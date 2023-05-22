import {Gender} from "../model/person/Gender";
import {Roles} from "../model/person/Roles";

export class UserDTO {
  id?:number;
  username?:string;
  avatar?:string;
  name?:string;
  phone_number?:string;
  address?:string;
  gender?:Gender;
  roles?:Roles[];
}
