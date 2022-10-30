import { ApiProperty } from '@nestjs/swagger';

export class RouteRankProxy {

  //#region Constructor

  constructor(
    rank: number,
    route: string,
    requests: number,
  ) {
    this.rank = rank;
    this.route = route;
    this.requests = requests;
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public rank: number;

  @ApiProperty()
  public route: string;

  @ApiProperty()
  public requests: number;

  //#endregion

}
