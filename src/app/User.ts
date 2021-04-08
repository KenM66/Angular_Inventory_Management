import { Company } from "./Company";

export class User{
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    admin!: boolean;
    securityQuestion!: string;
    securityAnswer!: string;
    companyNum!: number;

}