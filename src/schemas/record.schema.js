import { z } from "zod";

export const createRecordSchema = z.object({
    patient: z.string().nonempty(),
    doctor: z.string().nonempty(),
    vitalSigns: z.object({
        bloodPressure: z.object({
            systolic: z.number().nonnegative(),
            diastolic: z.number().nonnegative(),
        }),
        heartRate: z.number().nonnegative(),
        oxygenSaturation: z.number().nonnegative(),
        temperature: z.number().nonnegative(),
    }),
    clinicalHistory: z.string().nonempty(),
});

export const updateRecordSchema = z.object({
    patient: z.string().optional(),
    doctor: z.string().optional(),
    vitalSigns: z.object({
        bloodPressure: z.object({
            systolic: z.number().nonnegative().optional(),
            diastolic: z.number().nonnegative().optional(),
        }).optional(),
        heartRate: z.number().nonnegative().optional(),
        oxygenSaturation: z.number().nonnegative().optional(),
        temperature: z.number().nonnegative().optional(),
    }).optional(),
    clinicalHistory: z.string().optional(),
});
