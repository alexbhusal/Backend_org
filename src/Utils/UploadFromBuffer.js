const cloudinary = require('./Cloudinary');
const { performance } = require('perf_hooks');

async function handleUpload(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
      .end(buffer);
  });
}

module.exports = handleUpload;
