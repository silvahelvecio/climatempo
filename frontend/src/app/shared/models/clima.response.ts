export class climaProximoDias  {
    public id!: number;
    public cidadeId!: number;
    public dataPrevisao!: string;
    public clima!: string;
    public temperaturaMinima!: number;
    public temperaturaMaxima!: number;
    public grupoFilaId!: number;
    public cidade!: cidadeResponse;
}

export class cidadeResponse  {
    public id!: number;
    public nome!: string;
    public estadoId!: number;
    public estado!: estadoResponse;
}

export class estadoResponse  {
    public id!: number;
    public nome!: string;
    public uf!: string;
}
