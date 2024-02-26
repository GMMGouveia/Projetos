export interface AuthData {
    email: string;
    password: string;
}


export interface AuthResponseData {
    token: string;
    permissions: string;
}

export class User {
    constructor(
        public email: string,
        public permissions: string,
        public firstName: string,
        public lastName: string,
        public _token: string,
        public _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}

export interface UserDTO {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    permissions: string;
}