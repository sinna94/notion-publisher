import axios from "axios";
import React, { ReactElement, useEffect } from "react";

interface authResponse {
    code: string;
}

export const Auth = (): ReactElement => {
    useEffect(() => {
        const getAuth = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('code');

            const response = await axios.get<authResponse>('/auth', { params: { code } })
            if (response.status === 200) {
                sessionStorage.setItem('notionToken', `Bearer ${response.data.code}`)
            }
        }
        getAuth();
    }, [])

    return (<>
        <h2>Hi, Welcome Home!</h2>
    </>
    )
}