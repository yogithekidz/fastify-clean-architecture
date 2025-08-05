export type UserRequestLoginDto = {
    username: string;
    password: string;
}

export type UserRequestRegisterDto = {
    username: string;
    password: string;
}

export type UserRequestChangePasswordDto = {
    username: string;
    oldPassword: string;
    newPassword: string;
}