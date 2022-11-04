const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        title: String,
        content: String,
        id_user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        ban: Boolean,
    },

    {
        timestamps: true,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("note", schema);