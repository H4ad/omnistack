import { ApiProperty } from '@nestjs/swagger';

export class ServiceUsageRankProxy {

  //#region Constructor

  constructor(
    rank: number,
    service: string,
    requests: number,
  ) {
    this.rank = rank;
    this.service = service;
    this.requests = requests;
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public rank: number;

  @ApiProperty()
  public service: string;

  @ApiProperty()
  public requests: number;

  //#endregion

}
