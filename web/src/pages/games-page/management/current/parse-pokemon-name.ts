import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parsePokemonName'
})

export class ParsePokemonNamePipe implements PipeTransform {
    transform(roundKey: string): string {
        return roundKey.split("_").pop() || roundKey;
    }
}