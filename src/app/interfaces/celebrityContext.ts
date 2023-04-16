import { createContext } from "react";
import { Celebrity } from "./celebrity";

export interface CelebrityContextType {
    celebrities: Celebrity[];
    setCelebrities: (celebrities: Celebrity[]) => void;
}

export const initialCelebrityContext: CelebrityContextType = {
    celebrities: [],
    setCelebrities: ([]) => { },
};


export const CelebrityContext = createContext<CelebrityContextType>(initialCelebrityContext);