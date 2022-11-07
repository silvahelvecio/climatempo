import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpBaseService } from "src/app/core/http-base.service";
import { climaProximoDias } from "src/app/shared/models/clima.response";
import { temperaturaResponse } from "src/app/shared/models/temperatura.response";

@Injectable()
export class ClimaTempoService extends HttpBaseService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public listar(cidade: any): Observable<climaProximoDias[]> {
        let parameters = "/ClimaTempo?Cidade=" + cidade;
        return this.get(`/PrevisaoClima${parameters}`);
    }

    public listarprevisaohoje(): Observable<temperaturaResponse> {
        let parameters = "/PrevisaoClimaHoje?ordemTemperatura";
        return this.get(`/PrevisaoClima${parameters}`);
    }
}