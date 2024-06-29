import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
    try {
        const record = new Record(req.body);
        await record.save();
        res.status(201).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRecords = async (req, res) => {
    try {
        const records = await Record.find({ patient: req.user.id });
        res.status(200).send(records);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id);
        if (!record) return res.status(404).send({ message: "Record not found" });
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) return res.status(404).send({ message: "Record not found" });
        res.status(200).send(record);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteRecord = async (req, res) => {
    try {
        const Record = await Record.findByIdAndDelete(req.params.id);
        if (!Record) return res.status(404).send({ message: "Record not found" });
        res.status(200).send({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(400).send(error);
    }
};
