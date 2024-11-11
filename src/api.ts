import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export interface RootObject {
    count: number;
    next: null;
    previous: string;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export const fetchPokeList = async (offset: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
    if(!response.ok){
        throw new Error('Could not fetch pokeList')
    }

    const data:RootObject = await response.json()
    return data
}