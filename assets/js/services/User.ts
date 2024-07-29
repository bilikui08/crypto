import Api from "../helpers/Api";
import ROUTES from "../routes";
import UserModel from "../models/User";

export default class User 
{
    public static async get(email: string)
    {
        const response = await Api.post(ROUTES.USER_GET, email);

        console.log( response ); 

        return new UserModel(response.id, response.email);
    }
}