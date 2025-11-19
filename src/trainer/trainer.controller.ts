import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('trainers')
@ApiTags('Trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new trainer' })
  create(@Body() trainerDto: CreateTrainerDto) {
    return this.trainerService.create(trainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trainers' })
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific trainer' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trainerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trainer' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a trainer' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trainerService.remove(id);
  }
}
