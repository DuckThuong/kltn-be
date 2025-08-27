import { Module } from '@nestjs/common';

@Module({
imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'qlbh',
      entities: [
        
      ],
      synchronize: false,
      logging: false,
    }),
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
