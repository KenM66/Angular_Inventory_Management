
import { Address } from "./Address";
import { Bin } from "./Bin";
import { Company } from "./Company";

export class Warehouse{
    id!: number;
    name!: string;
    address!: Address;
    company!: Company;
    bins!: Bin[];
}