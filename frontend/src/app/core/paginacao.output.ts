export class PaginacaoOutput<T> {
    pagina: number;
    tamanhoPagina: number;
    totalItens: number;
    totalPaginas: number;
    itens: T[];
}