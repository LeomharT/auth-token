export default class Auth
{
    constructor()
    {

    }

    static SingleInstance: Auth;
    static GetSingleInstance(): Auth
    {
        if (this.SingleInstance) return this.SingleInstance;
        this.SingleInstance = new Auth;
        return this.SingleInstance;
    }
}
