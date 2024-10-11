import { useEffect } from 'react'
import { Nav } from '@pages'
import { Socket } from '../services/Socket'

function Home(){
    const io = new Socket()
    useEffect(()=>{
        io.sign('user', (data)=>{
            console.log('CLIENT DATA', data)
        })
    })
    useEffect(()=> {
        io.send('test', 'bu bir datadır')
    }, [])
    return (
        <>
            <Nav />
        
            Welcome to Messenger!

        </>
    )
}

export default Home