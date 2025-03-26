import React,{useEffect} from 'react'
// import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/ContextProvider';


const Dashboard = () => {
    const history = useNavigate()
    const {
        isLogin,
       } = React.useContext(Context);
    useEffect(() => {
		if (isLogin === false) {
            history('/login')
        }
        else{
            alert('congrats')
        }
	}, [isLogin,history])
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
