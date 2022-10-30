import { Module } from '@nestjs/common';
import { RouteRankController } from './controllers/route-rank.controller';
import { RouteRankModule } from './route-rank.module';

@Module({
  imports: [
    RouteRankModule,
  ],
  controllers: [
    RouteRankController,
  ],
})
export class RouteRankRoutingModule {}
