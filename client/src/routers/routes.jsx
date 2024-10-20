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
            path: '/interface',
            element: <Interface />,
            children: [
                {
                    path: '',
                    element: <h1>xd</h1>
                },
                {
                    path: 'dm/:id',
                    element: <Dm />
                }
            ]
        }
    ])
    return data
    
}

export default Routes