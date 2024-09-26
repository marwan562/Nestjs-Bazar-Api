import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/db-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule],
})
export class AppModule {}
