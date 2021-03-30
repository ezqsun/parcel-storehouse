export interface Customer {
    cid: number;
    address: string;
    email: string;
    name: string;
    points: number;
    registration_date: Date;
    phone_number: number;
    password: string;
    tier: number;
    is_blacklisted: number;
}