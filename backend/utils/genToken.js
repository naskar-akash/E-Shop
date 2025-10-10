import jwt from 'jsonwebtoken';

const genToken = (user) => {
    if (!user) {
        throw new Error("User couldn't be found!");
    }
    return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
};

export default genToken;