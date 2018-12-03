import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ProvinceSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  value: {
    type: Array(),
    required: true
  },
})

export default mongoose.model('Province', ProvinceSchema)
