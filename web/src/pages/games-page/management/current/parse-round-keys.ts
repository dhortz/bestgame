import { Pipe, PipeTransform } from '@angular/core';

interface ParsedRoundKey {
    pokemon: string;
}

@Pipe({
    name: 'parseRoundKeys'
})

export class ParseRoundKeysPipe implements PipeTransform {
    transform(roundKey: string): ParsedRoundKey {
        if (roundKey) {
            const splitRoundKey = roundKey.split("_");
            return <ParsedRoundKey>{
                pokemon: splitRoundKey[3]
            }
        }

        return <ParsedRoundKey>{ pokemon: "" };
    }
}