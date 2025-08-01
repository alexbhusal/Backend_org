const advertisementRouter = require('./Routes/AdvertisementRoute');
const AboutUsRoute = require('./Routes/AboutUsRoute');
const memberRoute = require('./Routes/MemberRoute');
const ErrorHandler = require('./Utils/ErrorHandler');
const galleryRoute = require('./Routes/GalleryRoute');
const noticeRouter = require('./Routes/NoticeRoute');
const adminRoute = require('./Routes/AdminRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/member', memberRoute);
app.use('/api/v1/notice', noticeRouter);
app.use('/api/v1/aboutus', AboutUsRoute);
app.use('/api/v1/gallery', galleryRoute);
app.use('/api/v1/advertisement', advertisementRouter);

app.get('/',(req,res)=>{
  res.send("Welcome to Organization's API");
});

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Opps Resource not found here',
  });
});

app.use(ErrorHandler);

module.exports = app;
