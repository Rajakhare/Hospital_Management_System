let mongoose = require("mongoose")

let counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        default: 0
    }
})

let counterModel = mongoose.model("counter", counterSchema)
module.exports = counterModel