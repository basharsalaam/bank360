export interface IUserData {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_no: string;
    org_name: string;
    avatar: any;
}

// optional version of user
export interface IUserDataOpt {
    uuid?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_no?: string;
    org_name?: string;
    avatar?: any;
}
