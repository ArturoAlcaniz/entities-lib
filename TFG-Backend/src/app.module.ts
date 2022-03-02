import { Response, Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigJwtModule } from './configJwt/configJwt.module';
import { AppController } from './app.controller';
import { HashingModule } from './hashing/hashing.module';
import { UsersModule } from './users/users.module';
import { Module, NestMiddleware, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users/services/users.service';
import path from 'path';

const resolvePath = (file: string) => path.resolve(`./dist/ui_v1/${file}`);

class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.sendFile(resolvePath('index.html'));
  }
}

function getRoute(route: string) {
  return {
    path: route,
    method: RequestMethod.ALL,
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigJwtModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'tfg',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    }),
    HashingModule,
    UsersModule
  ],
  providers: [],
  controllers: [AppController]
})

export class ApplicationModule {
  configure(frontEnd: MiddlewareConsumer) {
    frontEnd.apply(FrontendMiddleware).forRoutes(
      getRoute('/home'),
      getRoute('/contact')
    );
  }
}
