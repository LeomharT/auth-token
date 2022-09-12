import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

export default function App()
{
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

    const [token, setToken] = useState<string>('');

    const getToken = async () =>
    {
        let res = await fetch('http://localhost:3065/token');

        return await res.json();
    };

    const getSource = async () =>
    {
        let res = await fetch('http://localhost:8080/authorized', {
            method: 'GET',
            headers: { 'authorization': `Bearer ${token}` },
        });

        return await res.text();
    };
    useEffect(() =>
    {

        console.log(user, isAuthenticated, isLoading);
    }, [isAuthenticated, isLoading]);
    useEffect(() =>
    {
        getToken().then((data) =>
        {
            setToken(data.access_token);

            if (token)
            {
                getSource().then(res =>
                {
                    console.log(res);
                });
            }
        });
    }, [token]);
    return (
        <div>
            <button disabled={isAuthenticated || isLoading} onClick={() => loginWithRedirect()}>login</button>
            <button disabled={!isAuthenticated || isLoading} onClick={() => logout()}>logout</button>
        </div>
    );
}
