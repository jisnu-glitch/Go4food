import {useState} from "react"

const Login = ()=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    const handleSubmit =(event)=>{
        event.preventDefault()
        console.log('form submitted');
        
    }
    return(
        <div>
            <div><h1>Login</h1></div>
           <form onSubmit={handleSubmit}>
            <label>Email:
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
            </label>
            <label >Password:
                <input type="text" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
            </label>
            <button className="bg-[#A0C878] text-white p-4">
                Login
            </button>
            </form>
        </div>
    )
}

export default Login