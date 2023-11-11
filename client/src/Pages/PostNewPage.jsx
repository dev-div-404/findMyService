import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PostNewPage = () => {

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect( ()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getuser`).then(res =>{
            if(!res.data.loggedin)
            {
                alert('session expired.. need to log in');
                navigate('/userlogin')
            }
        }).catch(err => console.log(err));
    },[])



  return (
    <div>
        PostNewPage
    </div>
  )
}

export default PostNewPage