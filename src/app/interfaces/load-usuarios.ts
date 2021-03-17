import { Usuario } from "../models/usuario.model";

export interface LoadUsuarios {
    total: number;
    usuarios: Usuario[];
}
