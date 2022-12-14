const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "username is required"],
        },
        // email: {
        //     type: String,
        //     trim: true,
        //     lowercas: true,
        // },
        password: String,
        roles: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
            },
        ],
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

module.exports = mongoose.model("user", schema);