import crypto from 'crypto';

export const ResetPasswordTokenGeneration = () => {
    try {
        
        const resetToken = crypto.randomBytes(20).toString('hex');
        const tokenExpiry = Date.now() * 5 * 60 * 1000;

        return { resetToken, tokenExpiry }

    } catch (error) {
        throw new Error(`ResetPasswordToken generation failed`)
    }
}