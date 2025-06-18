import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export function validateNewPassword(oldPass: string, newPass: string) {
    if (oldPass === newPass) {
        throw new Error('A nova senha não pode ser igual à anterior');
    }
}
