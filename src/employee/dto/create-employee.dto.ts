import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John Doe',
    description: 'Employee name' })
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' ,
    description: 'Employee email'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1,
    description: 'Department ID' })
  @Type(() => Number)
  @IsInt()
  departmentId: number;

  @ApiPropertyOptional({ example: 'IT Technician',
    description: 'Employee role', required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
