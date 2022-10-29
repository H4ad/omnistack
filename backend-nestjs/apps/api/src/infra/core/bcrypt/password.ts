//#region Imports

import * as bcryptjs from 'bcryptjs';

//#endregion

export async function encryptPassword(plainPassword: string): Promise<string> {
  const salt = await bcryptjs.genSalt();

  return await bcryptjs.hash(plainPassword, salt);
}
