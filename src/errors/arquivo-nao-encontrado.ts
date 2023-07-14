import { ApplicationError } from "@/protocols";
import { func } from "joi";

export function arquivoNaoEncontrado(): ApplicationError {
    return {
        name: 'ArquivoNaoEncontrado',
        message: 'Selecione um arquivo para processar'
    }
}