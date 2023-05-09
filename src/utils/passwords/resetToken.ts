import { sha256 } from "js-sha256"

export const generateResetToken = () => {
    const randomToken = Math.random().toString(36).substring(2, 22)
    const resetToken = sha256(randomToken).toString()
    const resetTokenExpiration = Date.now() + 3600000
    return { resetToken, resetTokenExpiration }
}