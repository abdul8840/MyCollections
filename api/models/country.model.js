import mongoose, { Schema } from 'mongoose';

const countrySchema = new mongoose.Schema({
  country:{
    type: String,
    required: true
  },
  capital:{
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  currency_code:{
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  isd_code:{
    type: String,
    required: true
  },
  monetary:{
    type: String,
    required: true
  },
  land:{
    type: String,
    required: true
  },
  banknote:{
    type: String,
    required: true
  },
  coin:{
    type: String,
    required: true
  },
  island:{
    type: String,
    required: true
  },

  images: [{
    type: String,
    default: 'https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png',
  }],
}, {timestamps: true}
);

const Country = mongoose.model('Country', countrySchema);

export default Country;

// {
//   "country": "India",
//   "capital": "Delhi",
//   "Currency": "Rupee",
//   "language": "Hindi",
//   "currency_code": "INR",
//   "region": "Asia"
// }