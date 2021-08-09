import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meetin.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Employee) private employeeRepo:Repository<Employee>,
              @InjectRepository(ContactInfo) private contactInfRepo:Repository<ContactInfo>,
              @InjectRepository(Meeting) private meetingRepo:Repository<Meeting>,
              @InjectRepository(Task) private taskRepo:Repository<Task>
              ){}

  async seed(){

    //employee 1 Nikita
    const nik = this.employeeRepo.create({name:"Nikita"});
    await this.employeeRepo.save(nik);

    
    const nikContactInfo = this.contactInfRepo.create({phone:'994557862218',email:'nikita.r_s@mail.ru'})

    nikContactInfo.employee = nik;
    await this.contactInfRepo.save(nikContactInfo);


    //employee 2 Manager(me)
    const manager = this.employeeRepo.create({name:'Andrew',manager:nik});

    const task1 = this.taskRepo.create({name:' database'});
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({name:'Test the programm'});
    await this.taskRepo.save(task2);


    manager.tasks = [task1,task2];

    const meeting1 = this.meetingRepo.create({zoomUrl:"meeting.com"});
    meeting1.attendess = [nik];

    await this.meetingRepo.save(meeting1);


    await this.employeeRepo.save(manager);

  }
  getEmployeeById(id:number){
    return this.employeeRepo.findOne(id,{
      relations:['manager','directReports','tasks','contactInfo','meetings']
    })
  }

  getHello(): string {
    return 'Hello World!';
  }
}
