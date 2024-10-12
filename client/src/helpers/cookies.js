import { useCookies } from 'react-cookie';

export function useAuthToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const setToken = (token) => {
        if (!token) return false
        setCookie('token', token, { path: '/', maxAge: 86400, secure: true, sameSite: 'Strict' })
        return true
    };

    const getToken = () => {
        const token = cookies.token
        if (!token) return undefined
        return token
    };

    const removeToken = () => {
        removeCookie('token', { path: '/' })
        return true
    };

    return { setToken, getToken, removeToken }
}
