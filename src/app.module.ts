import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './db/prisma.service';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { DeviceModule } from './device/device.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [DepartmentModule, EmployeeModule, DeviceModule, TicketModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
