import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
         validate: {
             validator: function(v) {
                 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
             },
             message: "Неверный формат электронной почты"
         },
         required: [true, "Поле не может быть пустым"]
    },
    name: {
        type: String,
        required: [true, "Поле не может быть пустым"],
    },
    surname: {
        type: String,
        required: [true, "Поле не может быть пустым"],
    },
    city: {
        type: String,
        required: [true, "Поле не может быть пустым"],
    },
    password: {
        type: String,
        required: [true, "Поле не может быть пустым"],
    },
    phone: {
        type: Number,
        required: [true, "Поле не может быть пустым"],
    },
    index: {
        type: Number,
        required: [true, "Поле не может быть пустым"],
    },

  
});


export default mongoose.model('User', userSchema, 'users');