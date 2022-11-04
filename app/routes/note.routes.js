const express = require("express");
const note = require("../controllers/note.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .post([authJwt.verifyToken], note.createNote)
        .delete(note.deleteAllNote)
    
    router.route("/:id")
        .get([authJwt.verifyToken], note.getNoteByUser)
        .put([authJwt.verifyToken], note.updateNote)
        .delete([authJwt.verifyToken], note.deleteNote)

    app.use("/api/note", router);
};