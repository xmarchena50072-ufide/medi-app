import mongoose from "mongoose";

const medicalSchema = new mongoose.Schema({
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
    medicalConditions: {
        hypertension: {
            type: Boolean,
            required: true,
        },
        diabetes: {
            type: Boolean,
            required: true,
        },
        heartDisease: {
            type: Boolean,
            required: true,
        },
        kidneyDisease: {
            type: Boolean,
            required: true,
        },
        respiratoryDisorder: {
            type: Boolean,
            required: true,
        },
        other: {
            type: String,
            required: true,
        },
    },
    currentComplaints: {
        type: String,
        required: true,
    },
    notes: {
        type: [String],
        required: true, 
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

export default mongoose.model("Medical", medicalSchema);
