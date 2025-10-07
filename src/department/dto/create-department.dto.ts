import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'IT Department',
    description: 'The name of the department',
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    example: 'Handles internal technical support',
    description: 'A short description of what the department does',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
