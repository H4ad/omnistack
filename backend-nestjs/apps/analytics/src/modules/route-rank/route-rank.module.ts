import { Module } from '@nestjs/common';
import { IoredisModule } from '../../infra/core/ioredis/ioredis.module';
import { RouteRankService } from './services/route-rank.service';

@Module({
  imports: [
    IoredisModule,
  ],
  exports: [
    RouteRankService,
  ],
  providers: [
    RouteRankService,
  ],
})
export class RouteRankModule {}
