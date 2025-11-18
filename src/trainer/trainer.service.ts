import { Injectable, NotFoundException } from '@nestjs/common';
import { Trainer } from './entities/trainer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ){}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = this.trainerRepository.create(createTrainerDto);
    return this.trainerRepository.save(newTrainer);
  }

  async findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find();
  }

  async findOne(id: number): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id }, relations: ['teams']
    });

    if (!trainer) {
      throw new NotFoundException();
    }

    return trainer;
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
    await this.findOne(id);
    await this.trainerRepository.update(id, updateTrainerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.trainerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

}
