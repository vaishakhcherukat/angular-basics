import { Comment } from './comment';

export class Dish {
    id:string;
    name:String;
    image:String;
    category:String;
    featured:boolean;
    label:String;
    price:String;
    description:String;
    comments :Comment[];
;
}