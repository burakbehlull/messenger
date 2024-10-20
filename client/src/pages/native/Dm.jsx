import Messages from "./Messages"
import { useParams, useLocation } from "react-router-dom"


function Dm(){
    
    const { id } = useParams()
    const { state } = useLocation()
    const dm = state.dm

    return (
        <>        
            <Messages dmId={dm._id} />
        </>
    )
}

export default Dm