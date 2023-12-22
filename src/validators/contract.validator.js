const exp = require("constants");
const { object, string, date, number, array } = require("yup");

const contractSchema = object({
  tenants: array().required("Tenants are Required!"),
  signingDate: date().required("Signing Date is Required!"),
  startDate: date().required("Start Date is Required!"),
  endDate: date().required("End Date is Required!"),
  renewalDate: date().required("Renewal Notification Date is Required!"),
  monthlyRentalAmount: string().required("Monthly Amount is Required!"),
  monthlyTaxAmount: string().required("Tax Amount is Required!"),
  buildingManagementCharges: string().required(
    "Management Charges is Required!"
  ),
  securityDepositAmount: string().required("Deposit Amount is Required!"),
  annualRentalIncrease: string().required("Annual Increment is Required!"),
  wapdaSubmeterReading: number()
    .typeError("That doesn't look like a number!")
    .positive("Wapda meter number must be a positive number!")
    .integer("Wapda meter number should be integer!"),
  generatorSubmeterReading: number()
    .typeError("That doesn't look like a number!")
    .positive("Generator meter number must be a positive number!")
    .integer("Generator meter number should be integer!"),
  waterSubmeterReading: number()
    .typeError("That doesn't look like a number")
    .positive("Water meter number must be a positive number!")
    .integer("Water meter number should be integer!"),
  monthlyRentalDueDate: string().required("Due Date is Required!"),
  monthlyRentalOverDate: string().required("Over Due is Required!"),
  terminationNoticePeriod: string().required("Termination Notice is Required!"),
  nonrefundableSecurityDeposit: string().required(
    "Security Deposit is Required!"
  ),
  images: array(),
});

export default contractSchema;
