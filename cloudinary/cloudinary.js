const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({ 
    cloud_name: 'dxcrnqhbe', 
    api_key: '619293912447286', 
    api_secret: '2NzNT2GRBEFaoxQdF45yYGuYo7U' 
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'images',
        allowedFormat:['jpeg','png','jpg','gif','webp','avif']
    }
  })
  module.exports={
    cloudinary,storage
  }