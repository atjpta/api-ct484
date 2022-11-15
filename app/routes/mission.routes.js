const express = require("express");
const mission = require("../controllers/mission.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .post([authJwt.verifyToken], mission.createMission)
        // .post(mission.createMission)

        .delete(mission.deleteAllMission)

    router.route("/:id")
        .get([authJwt.verifyToken], mission.getMissionByUser)
        // .get(mission.getMissionByUser)

        .put([authJwt.verifyToken], mission.updateMission)
        .delete([authJwt.verifyToken], mission.deleteMission)

    app.use("/api/mission", router);
};