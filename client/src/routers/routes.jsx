import { useRoutes } from 'react-router-dom'
import { Home, Register, Login, Dm, Interface } from '@pages'

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
        },
        {
            path: '/dm',
            element: <Dm />
        },
        {
            path: '/interface',
            element: <Interface />
        }
    ])
    return data
    
}

export default Routes