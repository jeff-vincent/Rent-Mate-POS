import React, { Fragment, useState, useCallback, useRef }  from 'react';
// Cropper
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import M from 'materialize-css/dist/js/materialize.min.js';

// Initialize Arrow Function component with hooks, and destructure state.
const Cropper = ({handleUpdateImage, setPreviewUrl, previewUrl}) => {
  // Initialize State Variables
  const [imageName, setImageName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const cropper = useRef();

  

  // Cropper
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1.91 / 1 });
  // const [previewUrl, setPreviewUrl] = useState();

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      console.log('UPLOAD::::', e.target.files[0])
      console.log('NAME::::', e.target.files[0].name)
      setImageName(e.target.files[0].name)
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  const makeClientCrop = async crop => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, 'newFile.jpeg');
    }
  };
  // Create Preview of Crop
  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // var jpgFile = canvas.toDataURL("image/jpg");
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
        // handleUpdateImage(previewUrl)
        let jpgFile = new File([blob], imageName, { type: "image/jpg", });
        setImageFile(jpgFile);
        // console.log('BLOB::::', jpgFile)
      }, 'image/jpg');
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    // eslint-disable-next-line
    var instances = M.FormSelect.init(elems);
  });
  return (

    // Materialize theme
    <Fragment>    
      {/* <!-- Showcase --> */}     
              {/* // Cropper  */}
              <div className="input-field">
                <label for="id_file">Upload Your Image</label>
                <br/>
                {/* {{form.file}} */}
              </div>
              <div>
                <div>
                  <input id='id_file' type="file" accept="image/*" onChange={onSelectFile} />
                </div>
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={c => setCrop(c)}
                  onComplete={makeClientCrop}
                  ref={cropper}
                />
                {/* {previewUrl && <img alt="Crop preview" src={previewUrl} />} */}
              </div>        
              {/* End Cropper */}
              
    </Fragment>
  )
};

export default Cropper;
