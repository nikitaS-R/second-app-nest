import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Employee } from './employee.entity';
import { Task } from './task.entity';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meetin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'postgres',
    database:'mydb',
    username:'nikita',
    password:'root',
    entities:['dist/**/*.entity.js'],
    synchronize:true,
    logging:true
  }),
  TypeOrmModule.forFeature([Employee,Task,ContactInfo,Meeting])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
