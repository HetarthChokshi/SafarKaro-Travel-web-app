import Login from "./login";
import Register from "./Register";
import {useState} from 'react';
import Not404 from './Not404';

function Signup(){
    const isAuthenticated = sessionStorage.getItem('access_token'); 
    const [login, setLogin] = useState(true);
    if(isAuthenticated){
        return <Not404/>
    }
    return(
        <div>
            {login ? <Login setLogin={setLogin}/>:<Register setLogin={setLogin}/>}
        </div>
    )
}
export default Signup;