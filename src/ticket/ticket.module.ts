import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/db/prisma.module';

@Module({  
  imports: [PrismaModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
