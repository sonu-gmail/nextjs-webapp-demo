import * as yup from 'yup';

const MAX_FILE_SIZE = 102400; //100KB

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const schema = yup.object().shape({
    first_name:yup.string().required('First Name is required.'),
    last_name:yup.string().required('Last Name is required.'),
    email:yup.string().required('Email is required').email('Invalid email.'),
    password:yup.string().required('Password is required.'),
    confirm_password:yup.string().required('Confirm password is required. ').oneOf([yup.ref('password'), null], 'Passwords must match.'),
    gender:yup.string().required('Please select gender.'),
    hobbies:yup.array().of(yup.string()).min(1, 'Please select at least one hobbies.'),
    entry_date:yup.string().required('Please enter date.'),
    country: yup.string().required("Select Country"),
    address:yup.string().required('Address is required.'),
    image: yup.mixed().required("Please upload a image.")
    .test("is-valid-type", "Please upload a valid image type.",value => isValidFileType(value && value?.name, "image"))
    .test("is-valid-size", "Max allowed size is 100KB.",
      value => value && value.size <= MAX_FILE_SIZE)

})