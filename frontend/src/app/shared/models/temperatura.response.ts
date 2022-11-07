export class temperaturaResponse  {
    public maisQuentes!:temperaturaCidadeResponse[];
    public maisFrias!:temperaturaCidadeResponse[];
}

export class temperaturaCidadeResponse  {
    public cidade!: string;
    public uf!: string;
    public clima!: string;
    public temperaturaMinima!: number;
    public temperaturaMaxima!: number;
    public dataPrevisao!: string; 
}