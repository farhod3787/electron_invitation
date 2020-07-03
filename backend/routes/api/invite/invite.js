const express = require('express');
const router = express.Router();
const Controllers = require('../../../controller');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Errorrr");
      if (isValid) {
          error = null;
      }
      cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), Controllers.invite.createInvite);
router.get('/:random_id', Controllers.invite.getOneInvite);
router.delete('/:id', Controllers.invite.deleteInvite);

module.exports = router;