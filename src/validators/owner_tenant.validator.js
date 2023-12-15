import { array, date, object, string } from "yup";

export const ownerTenantSchema = object({
  name: string()
    .matches(
      /^(?=.{3,70}$)(?![a-z])(?!.*[_.]{2})[a-zA-Z ]+(?<![_.])$/,
      "Name should have at least 3 characters, not any number and first letter capital!"
    )
    .required("Name is Required!"),
  father: string()
    .matches(
      /^(?=.{3,70}$)(?![a-z])(?!.*[_.]{2})[a-zA-Z ]+(?<![_.])$/,
      "Father/Husband Name should have at least 3 characters, not any number and first letter capital!"
    )
    .required("Father/Husband Name is Required!"),
  cnic: string()
    .required("CNIC is required!")
    .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "CNIC must be 13 characters!"),
  cnicExpiry: date()
    .min(new Date(), "CNIC expiry date must be in the future!")
    .required("CNIC expiry date is required"),
  whatsapp: array(),
  email: string().email("Invalid Email"),
  currentAddress: string().required("Current Address is Required!"),
  permanentAddress: string().required("Permanent Address is Required!"),
  phoneNumber: array(),
  emergencyNumber: array(),
  images: array(),
  bankIbnNumber: string().matches(
    /^[a-zA-Z0-9]{24}$/,
    "IBN number should be 24 character long and not contain any special character and spaces!"
  ),
});
