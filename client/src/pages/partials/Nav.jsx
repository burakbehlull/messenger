import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <>
            <nav>
                <Link to="/" />
                <Link to="/register" />
                <Link to="/login" />
            </nav>
        </>
    )
}

export default Nav