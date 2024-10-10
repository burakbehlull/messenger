import { useRoutes } from 'react-router-dom'
import { Home, Register, Login } from '@pages'

const Routes = ()=> {
    const data = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/register',
            element: <Register />
        }, 
        {
            path: '/login',
            element: <Login />
        }
    ])
    return data
    
}

export default Routes