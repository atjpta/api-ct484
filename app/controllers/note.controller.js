const mongoose = require("mongoose");
const Note = require("../models/note.models");

exports.getNoteByUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const notes = await Note.find({ id_user: id }).sort({ createdAt : -1}).select([
            "name",
            'content',
            'createdAt',
            'title',
            'id_user'
        ]);
        if (!notes) {
            return next(res.status(404).json({ Message: "không thể tìm thấy note" }));
        }
        return res.json(notes);
    } catch (ex) {
        next(
            res.status(500).json({ Message: ` không thể lấy note cua user với id = ${req.params.id} ` })
        )
    }
};


exports.createNote = async (req, res, next) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        id_user: req.body.id_user
    })
    try {
        const document = await note.save();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể createNote" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi createNote" + error.Message);
        return next(res.status(500).send("lỗi khi getListNote"))

    }
}

exports.updateNote = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Note.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy note" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update note với id = ${req.params.id} ` })
        )
    }
}


exports.deleteNote = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Note.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Note" }));
        }
        return res.send({ message: "đã xóa Note thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Note với id = ${req.params.id} ` })
        )
    }
}
exports.deleteAllNote = async (req, res, next) => {
    try {
        const data = await Note.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Note đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Note` })
        )
    }
}



