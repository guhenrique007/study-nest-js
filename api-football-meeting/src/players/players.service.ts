import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { UpdatePlayerDto } from './dtos/update-player-dto'
import { Player } from './interfaces/player.interface'
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>){}

    private readonly logger = new Logger(PlayersService.name)

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>{
        const { email } = createPlayerDto
        const playerFound = await this.playerModel.findOne({email}).exec();

        if(playerFound){
            throw new BadRequestException(`Email ${email} already exists`)
        }

        const playerCreated = new this.playerModel(createPlayerDto)
        return await playerCreated.save()
    }

    async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void>{
        const playerFound = await this.playerModel.findOne({_id}).exec();

        if(!playerFound){
            throw new NotFoundException(`Player with id ${_id} not found`)
        }
        
        await this.playerModel.findOneAndUpdate({_id}, 
            {$set: updatePlayerDto}).exec()
    }

    async showPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async showPlayerByEmail(email: string): Promise<Player>{
        const playerFound = await this.playerModel.findOne({email}).exec();
        if(!playerFound) {
            throw new NotFoundException(`Player with email ${email} not found`)
        }
        return playerFound
    }

    async deletePlayer(_id): Promise<any>{
        const playerFound = await this.playerModel.findOne({_id}).exec();

        if(!playerFound) {
            throw new NotFoundException(`Player with id ${_id} not found`)
        }

        return await this.playerModel.deleteOne({_id}).exec(); 
    }
}
