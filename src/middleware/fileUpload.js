import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';




const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '_' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(null, false)
        }
    };
    const upload = multer({ storage, fileFilter });

    return upload
};

export const uploadSingleFile = (fieldname) => fileUpload().single(fieldname);
export const uploadmixOfFiles = (arrayOfFields) => fileUpload().fields(arrayOfFields);
