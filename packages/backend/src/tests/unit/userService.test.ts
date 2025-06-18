import { describe, it, expect } from 'vitest';
import { hashPassword, validateNewPassword } from '../../services/userService';

describe('userService', () => {
  it('hashPassword() gera hash diferente da senha pura', async () => {
    const plain = '123456';
    const hashed = await hashPassword(plain);
    expect(hashed).not.toBe(plain);
  });

  it('validateNewPassword() rejeita repetição de senha atual', () => {
    const oldPass = 'Old123!';
    const newPass = 'Old123!';
    expect(() => validateNewPassword(oldPass, newPass)).toThrowError(/igual/);
  });
});
