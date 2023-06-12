import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PusherService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./app.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ma_bdd',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [PusherService]
})
export class AppModule {}
