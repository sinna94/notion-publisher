import axios from "axios";
import React, { ReactElement, useEffect } from "react";
import { getAccessToken, setSessionStorage } from "./Storage";

interface AuthResponse {
    accessToken: string;
    workspaceName: string;
    workspaceIcon: string;
    botId: string;
    tokenType: string;
}

export const Auth = (): ReactElement => {
    useEffect(() => {
        const getAuth = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('code');

            const response = await axios.get<AuthResponse>('/auth', { params: { code } })
            if (response.status === 200) {
                Object.entries(response.data).forEach(([key, value]: [string, string]) => {
                    setSessionStorage(key, value);
                })
            }
        }
        getAuth();
    }, [])

    const onClickButton = async () => {
        await axios.get('/page/search', { params: { 'accessToken': getAccessToken() } })
    }

    return (
        <>
            <h2>Hi, Welcome Home!</h2>
            <button type='button' onClick={onClickButton}>검색</button>
        </>
    )
}