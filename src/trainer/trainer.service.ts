import { Injectable, NotFoundException } from '@nestjs/common';
import { Trainer } from './entities/trainer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerResponseDto } from './dto/trainer-response.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ){}

  async create(createTrainerDto: CreateTrainerDto): Promise<TrainerResponseDto> {
    const newTrainer = this.trainerRepository.create(createTrainerDto);
    await this.trainerRepository.save(newTrainer);
    return {
      id: newTrainer.id,
      name: newTrainer.name,
      cityOfOrigin: newTrainer.cityOfOrigin,
    };
  }

  async findAll(): Promise<TrainerResponseDto[]> {
    const trainers = await this.trainerRepository.find();

    return trainers.map(trainer => ({
      id: trainer.id,
      name: trainer.name,
      cityOfOrigin: trainer.cityOfOrigin,
    }));
  }

  async findOne(id: number): Promise<TrainerResponseDto> {
    const trainer = await this.trainerRepository.findOne({
      where: { id }, relations: ['teams']
    });

    if (!trainer) throw new NotFoundException('Trainer not found.');

    return {
      id: trainer.id,
      name: trainer.name,
      cityOfOrigin: trainer.cityOfOrigin,
    }
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<TrainerResponseDto> {
    await this.findOne(id); // Check if the trainer exists
    await this.trainerRepository.update(id, updateTrainerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.trainerRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Trainer not found.');
  }

}
