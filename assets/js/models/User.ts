export default class User 
{
    private id?: number;
    private email?: string;
    private static instance: User|null = null;

    public constructor(id?: number, email?: string)
    {
        this.id = id;
        this.email = email;
    }

    public getId(): number | undefined
    {
        return this.id;
    }

    public getEmail(): string | undefined
    {
        return this.email;
    }

    public static getInstance(): User
    {
        if (this.instance == null) {
            this.instance = new User();
        }

        return this.instance;
    }
}