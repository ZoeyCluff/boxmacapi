var mongoose = require('mongoose');
const {paginate} = require('mongoose-paginate');


var boxmac = mongoose.model('boxmac', {
  ProductName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  OriginCountry: {
    type: String,
    default: false
  },

  StoreBrand: {
    type: String,
    default: null
  },

  Type: {
    type: String,
    default: null,
    required: true
  },
  Pasta: {
    type: String,
    default: null,
    required: false
  },
  ADC: {
    type: String,
    default: null,
    required: false
  },
  PastaType: {
    type: String,
    default: null,
    required: false
  },
  Org: {
    type: String,
    default: 'N',
    required: false
  },
  Veg: {
    type: String,
    default: 'N',
    required: false
  },
  Mic: {
    type: String,
    default: null,
    required: false
  },
  Exp: {
    type: String,
    default: null,
    required: false
  },
  PriceRaw: {
    type: String,
    default: null,
    required: false
  },
  SauceType: {
    type: String,
    default: 'dry',
    required: true
  },
  BoxSize: {
    type: String,
    default: null,
    required: true
  },
  EpNo: {
    type: Number,
    default: null,
    required: true
  },
  URL: {
    type: String,
    default: null,
    required: true
  },
  Price: {
    type: String,
    default: null,
    required: true
  },
  Rating: {
    type: String,
    default: null,
    required: false
  },
  Comments: {
    type: String,
    default: null,
    required: false
  }
});

module.exports = {boxmac};
