import { FdsEntities } from '@enums/fds/entities/fds-entities';
import { IdGeneratorService } from '@services/id-generator/id-generator.service';
import { SurfSpec } from './surf-spec';
import { Xb } from '../primitives';
import { find } from 'lodash';

export interface IVentSpec {
    id: string,
    uuid: string,
    idAC: number,
    elevation: number,
    xb: Xb,
    surf_id: any,
    surf: any
}

export class VentSpec {
    private _id: string;
    private _uuid: string;
    private _idAC: number;
    private _xb: Xb;
    private _elevation: number;
    private _surf: any;

    constructor(jsonString: string, surfs: SurfSpec[] = undefined) {

        let base: IVentSpec;
        base = <IVentSpec>JSON.parse(jsonString);

        let idGeneratorService = new IdGeneratorService;

        let vent = FdsEntities.vent;

        this.id = base.id || '';
        this.uuid = base.uuid || idGeneratorService.genUUID();
        this.idAC = base.idAC || 0;
        this.elevation = base.elevation || 0;

		this.xb = new Xb(JSON.stringify(base.xb), 'vent') || new Xb(JSON.stringify({}), 'vent');

        this.surf = surfs && base.surf_id != undefined ? find(surfs, function (surf) { return surf.id == base.surf_id; }) : undefined;

    }

    /** Desc ... */
    changeSurfId(id_old, list) {
        //return accessor.selectSetter(self, 'surf.surf_id', id_old, list);
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get uuid(): string {
        return this._uuid;
    }

    public set uuid(value: string) {
        this._uuid = value;
    }

    public get idAC(): number {
        return this._idAC;
    }

    public set idAC(value: number) {
        this._idAC = value;
    }

    public get xb(): Xb {
        return this._xb;
    }

    public set xb(value: Xb) {
        this._xb = value;
    }

    public get elevation(): number {
        return this._elevation;
    }

    public set elevation(value: number) {
        this._elevation = value;
    }

    public get surf(): any {
        return this._surf;
    }

    public set surf(value: any) {
        this._surf = value;
    }

    public toJSON(): object {

        let surf_id;
        this.surf == undefined ? surf_id = '' : surf_id = this.surf.id;

        var vent = {
            id: this.id,
            uuid: this.uuid,
            idAC: this.idAC,
            elevation: this.elevation,
            surf_id: surf_id,
            xb: this.xb.toJSON()
        }
        return vent;
    }

}

