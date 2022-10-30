//#region Imports

import { Injectable } from '@nestjs/common';

//#endregion

@Injectable()
export class PulseService {

  //#region Public Methods

  public async getPulse(): Promise<number> {
    // delay to not return the data instantly
    await new Promise(resolve => setTimeout(resolve, 1_000));

    return +new Date();
  }

  //#endregion

}
