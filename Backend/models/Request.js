import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  requiredDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
}, {
  timestamps: true
});

export default mongoose.model("Request", requestSchema);

 