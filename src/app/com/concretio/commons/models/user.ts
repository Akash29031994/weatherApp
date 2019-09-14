export class UserLogin {
    public username: string;
    public password: string;
}

export class User {
    public username: string;
    public password: string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public accessAPIId: string;
}

export class UserResponse {
    public status: string;
    public message: string;
    public data: User;
}

export class LoginResponse {
    public jwttoken: string;
    public token: string;
}