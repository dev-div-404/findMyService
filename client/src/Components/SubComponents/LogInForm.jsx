import React, { useState } from 'react'
import './LogInForm.css'

const LogInForm = () => {

    const [input , setInput] = useState({
        email : "",
        password: ""
    })

    const typeEmailHamdler = (e) =>{
        setInput({...input, email : e.target.value})
    }

    const typePasswordHamdler = (e) =>{
        setInput({...input, password:e.target.value})
    }

    const logInButtonClickHandler = () =>{
        if(input.email === '' || input.password === '')
            alert('fill all the fields')
        else console.log(input);
    }


  return (
    <div  className='loginform'>
        <div className='loginformfields'>
            <form className=''>
                <input 
                    type='email'
                    placeholder='Type Email ... '
                    required
                    className='formtextfields'
                    onChange={typeEmailHamdler}
                    />
                <input 
                    type='password'
                    placeholder='Password'
                    required
                    className='formtextfields'
                    onChange={typePasswordHamdler}
                    />
                <button
                    className='formtextfields loginbutton'
                    onClick={logInButtonClickHandler}
                    type='button'
                >
                    Log In
                </button>
            </form>
        </div>
    </div>
  )
}

export default LogInForm