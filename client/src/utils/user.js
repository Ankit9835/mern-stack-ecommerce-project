import axios from "axios"


export const submitUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_URL}/create-or-update-user`,{},{
      headers:{
        authtoken
      }
    })
  }

  export const currentUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_URL}/current-user`,{},{
      headers:{
        authtoken
      }
    })
  }

export const RoleBasedRedirection = async (res) => {
  if(res.data.role === 'admin'){
    
  } else {
    
  }
}