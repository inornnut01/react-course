import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// learn more about useSelector, use Navigate

function Protected({children, authentication = true}) {

  const authStatus = useSelector((state) => state.auth.status ) //?

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    /*
    request to authentication = true but authStatus not login yet = false, This case!!
    ex: true && (false !== true): true =>>> true&true = navigate("/login")
    */

    if (authentication && authStatus !== authentication) {
      navigate("/login")
      
    /*
    This case, if the user already login in web. it will not see /login and /sign-up because it have authentication={false}. sample: authStatus: true
    ex. !false(true) & (true !== false) =>>> true && true = navigate("/")
    */
    } else if (!authentication && authStatus !== authentication ){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}

export default Protected


// if(true){
//   if (false) {
//     navigator("/login")
//   }
// }