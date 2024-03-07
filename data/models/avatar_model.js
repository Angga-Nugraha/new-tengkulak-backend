import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

});

avatarSchema.pre('save', async function (next) {

    const currentImg = await Avatar.findOne({
        userId: this.userId,
    });

    if (currentImg) {
        await Avatar.findOneAndDelete({
            userId: this.userId,
        });
    }
    next();
});

const imageProductSchema = new mongoose.Schema({
    img: [{
        data: Buffer,
        contentType: String,
        url: {
            type: String,
            unique: true,
        },
    }],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
});

imageProductSchema.pre('save', async function (next) {

    const currentImg = await ImageProduct.findOne({
        productId: this.productId,
    });

    if (currentImg) {
        await ImageProduct.findOneAndDelete({
            productId: this.productId,
        });
    }
    next();
});

export const Avatar = mongoose.model('Avatar', avatarSchema);
export const ImageProduct = mongoose.model('ImgProduct', imageProductSchema);