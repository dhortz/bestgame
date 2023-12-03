import { Pipe, PipeTransform } from '@angular/core';

interface ParsedRoundKey {
    day: string;
    week: string;
    pokemon: string;
}

@Pipe({
    name: 'parseRoundKeys'
})

export class ParseRoundKeysPipe implements PipeTransform {
    transform(roundKey: string): ParsedRoundKey {
        if(roundKey) {
            const splitRoundKey = roundKey.split("_");
            return <ParsedRoundKey>{
                day: splitRoundKey[1],
                week: splitRoundKey[2],
                pokemon: splitRoundKey[3] 
            }
        }

        return <ParsedRoundKey>{ day: "", week: "", pokemon: ""};
    }
}