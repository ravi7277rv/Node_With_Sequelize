import bcrypt from 'bcrypt';

export const HashPassword = ( password ) => {
    try {
        const saltRound = 10;
        const salt =  bcrypt.genSaltSync(saltRound)
        const hasPass = bcrypt.hashSync(password, salt);
        return hasPass;
    } catch (error) {
        throw error;
    }
} 