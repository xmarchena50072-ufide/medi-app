import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vitalSigns: {
        bloodPressure: {
            systolic: Number,
            diastolic: Number,
        },
        heartRate: Number,
        oxygenSaturation: Number,
        temperature: Number,
    },
    clinicalHistory: {
        type: String,
        required: true,
    },
    files: {
        type: [String],  // Aquí se almacenarán las rutas de los archivos o nombres de archivo.
        required: true,  // Si los archivos son obligatorios.
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);
