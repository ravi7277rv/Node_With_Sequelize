import bcrypt from 'bcrypt';

export const ValidatePassword = async (newPassowrd, oldPassword) => {
    try {
        const isValid = await bcrypt.compare(newPassowrd, oldPassword);
        return isValid;
    } catch (error) {
        throw new Error('Error while validating password :', error);
    }
}

export const ComparePassword = (newPassword, oldPassword) => {
    try {
        let isSamePassword = bcrypt.compareSync(newPassword, oldPassword);
        return isSamePassword;
    } catch (error) {
        throw new Error('Error while comparing password', error)
    }
}