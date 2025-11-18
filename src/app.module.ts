import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { TeamModule } from './team/team.module';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'nestjsuser',
      password: process.env.DATABASE_PASSWORD || 'nestjspassword',
      database: process.env.DATABASE_NAME || 'nestjsdb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TrainerModule,
    TeamModule,
    PokeapiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
