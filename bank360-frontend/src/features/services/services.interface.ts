export interface IPostUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_no?: string;
    org_name?: string;
    password?: string;
    photo?: string;
    time_pass: string;
}

export interface IAccount {
    account_id: string;
    account_no: string;
    name: string;
    acc_type: string;
    balance: number;
    currency: string;
    bank_name: string;
    institution_type: string;
    status: string;
    re_auth: boolean;
    auth_method: boolean;
    updated_at: string;
    created_at: string;
}

export interface IPaginatedAccountResponse {
    count: number;
    next: string;
    previous: string;
    results: IAccount[];
}

export interface IComparedTransactionResponse {
    inflow: {
        count: ICompare;
        amount: ICompare;
    };
    outflow: {
        count: ICompare;
        amount: ICompare;
    };
    balance: ICompare;
}

export interface ICompare {
    now: number;
    then: number;
    diff: number;
    percent: number;
}

export interface ITransaction {
    account_info: IAccountInfo;
    category_info: ICategoryInfo;
    uuid: string;
    tran_type: boolean;
    amount: number;
    balance: number;
    auto_category: any;
    channels: string;
    narration: string;
    tran_date: string;
    updated_at: string;
    created_at: string;
}

export interface IAccountInfo {
    account_id: string;
    account_no: string;
    name: string;
    acc_type: string;
    balance: number;
    currency: string;
    bank_name: string;
    institution_type: string;
    status: string;
    re_auth: boolean;
    auth_method: boolean;
    updated_at: string;
    created_at: string;
}

export interface ICategoryInfo {
    id: number;
    category: string;
    default: boolean;
    updated_at: string;
    created_at: string;
}
