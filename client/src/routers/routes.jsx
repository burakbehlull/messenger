import { useRoutes } from 'react-router-dom'
import { Home } from '@pages'

const Routes = ()=> {
    const data = useRoutes([
        {
            path: '/',
            element: <Home />
        }
    ])
    return data
    
}

export default Routes