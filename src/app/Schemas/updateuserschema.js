import * as yup from 'yup';

const MAX_FILE_SIZE = 102400; //100KB

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const updateuserschema = yup.object().shape({
    first_name:yup.string().required('First Name is required.'),
    last_name:yup.string().required('Last Name is required.'),
    email:yup.string().required('Email is required').email('Invalid email.'),
    gender:yup.string().required('Please select gender.'),
    hobbies:yup.array().of(yup.string()).min(1, 'Please select at least one hobbies.'),
    entry_date:yup.string().required('Please enter date.'),
    country: yup.string().required("Select Country"),
    address:yup.string().required('Address is required.'),
    image: yup.mixed().notRequired().test('fileSize', 'File is too large', (value) => {
        if (!value) return true; // If no file is selected, validation passes
        return value && value.size <= 1048576; // File size limit, adjust as necessary
    }).test('fileType', 'Unsupported file format', (value) => {
        if (!value) return true; // If no file is selected, validation passes
        return value && ['image/jpeg', 'image/png'].includes(value.type); // Supported file types
    }),
})