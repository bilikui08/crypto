import Api from "../helpers/Api";
import ROUTES from "../routes";

export default class Auth 
{
    public static async loginCheck(params: {})
    {
        const data = await Api.post(ROUTES.LOGIN_CHECK, params);

        if (data.token) {
            localStorage.setItem("token", data.token)
        }

        return data;
    }

    public static isLoggedIn(): boolean
    {
        console.log( localStorage.getItem('token') );
        return localStorage.getItem('token') != null;
    }

    public static async logout()
    {
        localStorage.clear();
    }
}