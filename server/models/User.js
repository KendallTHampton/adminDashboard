// This will be a schema tha we will create for the user that will represent the model of the data. Models are usually used to define the structure of the data, such as the fields and data types of a table in a database. They also define the relationships between different types of data, such as a one-to-many or many-to-many relationship

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email:
        {
            type: String,
            required: true,
            min: 50,
            unique: true
        },
        password:
        {
            type: String,
            required: true,
            min: 5,
            unique: true
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "admin"
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User", UserSchema)
export default User