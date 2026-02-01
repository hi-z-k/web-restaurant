import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  itemsSummary: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'active' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  preferences: { type: String, required: false }
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Order = mongoose.model('Order', orderSchema);
export { Order };