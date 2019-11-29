const router = require('express').Router();
const sequelize = require('../../db/init.js');
const Flag = sequelize.import('../../models/flag.js');
const Place = sequelize.import('../../models/place.js');
const Memory = sequelize.import('../../models/memory.js');
const connect = require('connect-ensure-login');

const getPhotosWithUrls = require('../../helpers/getPhotosWithUrls.js');


router.all('*', connect.ensureLoggedIn(), function(req, res, next) {
  next();
});


// List of Flag Types:
router.get('/', function(req, res) {
  res.render('admin/photos');
});

router.get('/to-approve', async function(req, res) {
  const photos = (await sequelize.query(`
    SELECT Photos.*, Places.name as placeName,
    Places.address as placeAddress
    from Photos
    INNER JOIN Places on Photos.placeId = Places.placeId
  `))[0]
  
  const photosWithUrls = await getPhotosWithUrls(photos);
  
  console.log("******")
  console.log(photosWithUrls);
  
  res.render('admin/photos/to-approve', {photos: photosWithUrls})
});

module.exports = router;