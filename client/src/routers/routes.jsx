import { useRoutes } from 'react-router-dom'
import { Home } from '../pages/index'
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