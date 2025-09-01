import { Module } from '@nestjs/common';

@Module({
<<<<<<< HEAD
  imports: [],
=======
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
>>>>>>> 6dcc43e0bf955bdad546288025f4167ae969d41e
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
