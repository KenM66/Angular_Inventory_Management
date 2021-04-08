import { Item } from "./Item";
import { Warehouse } from "./Warehouse";

export class Bin{
    id!: number;
    name!: string;
    warehouseNum: number|any;
    items!: Item[];
    warehouse!: Warehouse;
    
    tempBinString!: string;

}