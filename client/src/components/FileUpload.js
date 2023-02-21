import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading, loading }) => {
  const { user } = useSelector((state) => state.auth);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let uploadFileImage = values.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_URL}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                console.log("file upload", res.data);
                uploadFileImage.push(res.data);
                setValues({ ...values, images: uploadFileImage });
              })
              .catch((err) => {
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const removeImage = async (public_id) => {
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_URL}/removeimage`,{public_id},{
        headers:{
          authtoken: user.token
        }
      })
      if(response){
        setLoading(false)
        const {images} = values
        const filterItem = images.filter((image) => {
          return image.public_id !== public_id
        })
        setValues({...values, images:filterItem })

      }
    } catch (error) {
       console.log(error);
        setLoading(false);
    }
  }

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => {
            return (
              <Badge count="x" key={image.public_id} onClick={() => removeImage(image.public_id)} style={{cursor:"pointer"}}>
                <Avatar
                  src={image.url}
                  size={60}
                  className="m-3"
                />
              </Badge>
            );
          })}
      </div>
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
    </>
  );
};

export default FileUpload;
