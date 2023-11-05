import config_env_variable from '../config_env_variable/config_env_variable';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    // setting up client and account
    // as all appwrite method accessible through account only
    constructor() {
        this.client
            .setEndpoint(config_env_variable.appwriteUrl)
            .setProject(config_env_variable.appwriteProjectId);

        this.account = new Account(this.client);
    };

    // user signUp
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Account created succesfully
                // call login as account created
                this.login({ email, password });
            }
            else {

                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    // user login
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    };

    // check user loggedIn or not
    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }
        return null;
    };

    // logout erase all sessions 
    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }

};

// export object of AuthService 
// so directly use no need to create object again in componets
const authService = new AuthService();
export default authService;