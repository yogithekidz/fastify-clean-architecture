export interface UserRequestLoginDto {
    username: string;
    password: string;
}

export interface UserRequestRegisterDto {
    username: string;
    password: string;
}

export interface UserRequestDeactivateDto {
    username: string;
}