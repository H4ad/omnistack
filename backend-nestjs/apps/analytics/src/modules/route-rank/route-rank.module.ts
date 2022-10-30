import { Module } from '@nestjs/common';
import { IoredisModule } from '../../infra/core/ioredis/ioredis.module';
import { RouteRankRepository } from './repositories/route-rank.repository';
import { RouteRankService } from './services/route-rank.service';

@Module({
  imports: [
    IoredisModule,
  ],
  providers: [
    RouteRankRepository,
    RouteRankService,
  ],
  exports: [
    RouteRankService,
  ],
})
export class RouteRankModule {}
