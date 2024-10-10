import { useRoutes } from 'react-router-dom'
import { Home, Register } from '@pages'

const Routes = ()=> {
    const data = useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/register',
            element: <Register />
        }
    ])
    return data
    
}

export default Routes