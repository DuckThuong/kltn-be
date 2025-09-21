import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './modules/login_register/login_register.module';
import { DfUser } from './entity/user/df_user.entity';
import { DfUserRole } from './entity/user/df_user_role.entity';
import { DfRole } from './entity/user/df_role.entity';
import { MsRender } from './entity/user/ms_render.entity';
import { TbUser } from './entity/user/tb_user.entity';
import { TbPayment } from './entity/tb_payment.entity';

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
        DfUser,
        DfUserRole,
        DfRole,
        MsRender,
        TbUser,
        TbPayment

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
