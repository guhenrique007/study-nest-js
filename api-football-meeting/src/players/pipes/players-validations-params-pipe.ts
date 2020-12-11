import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayersValidationsParamsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata){
        if(!value){
            throw new BadRequestException(`The value of parameter ${metadata.data} should be informed`)
        }

        return value;
    }
}