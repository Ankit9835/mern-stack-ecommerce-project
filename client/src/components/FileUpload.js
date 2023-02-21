import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Resizer from "react-image-file-resizer";

const FileUpload = ({
    values,
    setValues
}) => {
const {user} = useSelector((state) => state.auth)
 const fileUploadAndResize = (e) => {
    let files = e.target.files
    let uploadFileImage = values.images
    if(files){
        for(let i = 0; i < files.length; i++){
            Resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (uri) => {
                  axios.post(`${process.env.REACT_APP_URL}/uploadimages`,{image:uri},{
                    headers:{
                        authtoken: user.token
                    }
                  }).then((res) => {
                    console.log('file upload',res.data)
                    uploadFileImage.push(res)
                    setValues({...values, images: uploadFileImage})
                  }).catch((err) => {
                    console.log('CLOUDINARY UPLOAD ERR',err)
                  })
                },
                "base64"
              );
        }
    }
 }

  return (
    <div className="row">
    <label className="btn btn-primary">
      Choose File
      <input
        type="file"
        multiple
        hidden
        accept="images/*"
        onChange={fileUploadAndResize}
      />
    </label>
  </div>
  )
}

export default FileUpload
