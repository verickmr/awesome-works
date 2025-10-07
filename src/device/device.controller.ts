import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiBody({ type: CreateDeviceDto })
  @ApiResponse({ status: 201, description: 'Device created successfully.' })
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({ status: 200, description: 'List of devices.' })
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get device by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Device found.' })
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update device by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateDeviceDto })
  @ApiResponse({ status: 200, description: 'Device updated.' })
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete device by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Device deleted.' })
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }
}