import { Link } from "react-router-dom";

import MarvelError from "../error/MarvelError";

const NotFound = () => {
    return(
        <div>
            <MarvelError/>
                <p style={{'textAlign': 'center', 'fontSize': '24px'}}>PAGE NOT FOUND!</p>
            <Link to='/' style={{'display':'block','textAlign': 'center', 'fontSize': '14px','marginTop':'15px'}}>
                {'<- Back to main page'}
            </Link>
        </div>
    )
}

export default NotFound;