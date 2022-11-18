const Mission = require("../models/mission.models");
const mongoose = require("mongoose");

exports.getMissionByUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const Missions = await Mission.find({ id_user: id }).sort({ createdAt: -1 })
        if (!Mission) {
            return next(res.status(404).json({ Message: "không thể tìm thấy getMissionByUser" }));
        }
        return res.json(Missions);
    } catch (error) {
        next(
            res.status(500).json({ Message: ` không thể lấy getMissionByUser cua user với id = ${req.params.id} ++ ${error} ` })
        )
    }
};

exports.getMissionByUserFinish = async (req, res, next) => {
    const { id } = req.params;
    try {
        const Missions = await Mission.find({ id_user: id }).sort({ finishDate: 1, finishTime: 1 })
        if (!Mission) {
            return next(res.status(404).json({ Message: "không thể tìm thấy getMissionByUser" }));
        }
        return res.json(Missions);
    } catch (error) {
        next(
            res.status(500).json({ Message: ` không thể lấy getMissionByUser cua user với id = ${req.params.id} ++ ${error} ` })
        )
    }
};


exports.createMission = async (req, res, next) => {
    const mission = new Mission({
        title: req.body.title,
        content: req.body.content,
        id_user: req.body.id_user,
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        finishDate: req.body.finishDate,
        finishTime: req.body.finishTime,
    })
    try {
        const document = await mission.save();
        if (!document) {
            return next(res.status(404).json({ Message: "không thể createMission" }));
        }
        return res.send(document);
    } catch (error) {
        console.log("lỗi createMission" + error.Message);
        return next(res.status(500).send("lỗi khi getListNote" + error))

    }
}

exports.updateMission = async (req, res, next) => {
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
        const document = await Mission.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy updateMission" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update note với id = ${req.params.id} ++ ${error}` })
        )
    }
}


exports.completedMission = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Mission.findByIdAndUpdate(condition, { completed: 1 }, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy completedMission"  }));
        }
        return res.send({ message: "đã đánh dấu hoàn thành"});
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể đánh dấu hoàn thành note với id = ${req.params.id} ++ ${error}` })
        )
    }
}



exports.deleteMission = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Mission.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy deleteMission" }));
        }
        return res.send({ message: "đã xóa Mission thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Mission với id = ${req.params.id} ` })
        )
    }
}
exports.deleteAllMission = async (req, res, next) => {
    try {
        const data = await Mission.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Mission đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Mission` })
        )
    }
}



