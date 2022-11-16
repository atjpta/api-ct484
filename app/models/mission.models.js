const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        title: String,
        content: String,
        startDate: String,
        startTime: String,
        finishDate: String,
        finishTime: String,
        completed: {
            type: Boolean,
            default: false,
        }
    },
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("mission", schema);