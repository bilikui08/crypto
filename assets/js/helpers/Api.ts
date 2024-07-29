export default class Api 
{
    public static async post(url: string, data = {})
    {
        return this.doRequest(url, 'POST', data);
    }

    public static async get(url: string, data:string|{} = {}, token?: string|null|undefined)
    {
        return this.doRequest(url, 'GET', data);
    }

    public static async put(url: string, data = {}, token?: string|null|undefined)
    {
        return this.doRequest(url, 'PUT', data);
    }

    public static async delete(url: string, data = {}, token?: string|null|undefined)
    {
        return this.doRequest(url, 'DELETE', data);
    }

    private static async doRequest(url: string, method: string, data:string|{} = {})
    {
        let headers;
        let token = localStorage.getItem('token');
        if (typeof token != 'undefined' || token != null) {
            headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        } else {
            headers = {
                'Content-Type': 'application/json'
            }
        }

        try {
            let response;
            if (method != 'GET') {
                response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(data)
                });
            } else {
                const urlParam = url + '/' + data;
                response = await fetch(urlParam, {
                    method: method,
                    headers: headers
                });
            }
    
            return await response.json();
    
        } catch(error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

}