import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './modules/login_register/login_register.module';
import { UserDefault } from './entities/userDefault.entity';
import { UserInformation } from './entities/userInformation.entity';

@Module({
imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'kltn',
      entities: [
        UserDefault,
        UserInformation
      ],
      synchronize: false,
      autoLoadEntities: true,
      logging: false,
    }),
    LoginModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
