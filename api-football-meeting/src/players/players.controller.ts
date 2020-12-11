import { Body, Controller, Post, Get, Query, Delete, UsePipes, ValidationPipe, Put, Param } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { UpdatePlayerDto } from './dtos/update-player-dto'
import { PlayersService } from './players.service'
import { Player } from './interfaces/player.interface'
import { PlayersValidationsParamsPipe } from './pipes/players-validations-params-pipe'


@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {

    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto: CreatePlayerDto): Promise<Player>{
        return await this.playersService.createPlayer(createPlayerDto)
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param('id', PlayersValidationsParamsPipe) id:string): Promise<void>{  
        await this.playersService.updatePlayer(id, updatePlayerDto)
    }

    @Get()
    async showPlayers(
        @Query('email') email: string): Promise<Player[] | Player> {
        if(email) { 
            return await this.playersService.showPlayerByEmail(email);   
        } else {
            return await this.playersService.showPlayers();
        }
    }

    @Delete('/:id')
    async deletePlayer(
        @Param('id', PlayersValidationsParamsPipe) id: string): Promise <void>{
            this.playersService.deletePlayer(id)
        }
}
