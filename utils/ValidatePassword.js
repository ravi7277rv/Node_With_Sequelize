import bcrypt from 'bcrypt';

export const ValidatePassword = (newPassowrd, oldPassword) => {
    try {
        const isValid = bcrypt.compare(newPassowrd,oldPassword);
        return isValid;
    } catch (error) {
        throw new Error('Error while validating password :',error);
    }
}