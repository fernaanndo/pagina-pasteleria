import type { TipoUsuario, Usuario } from "../types/usuario";
import {
  dominioPermitido,
  esRequerido,
  largoMaximo,
  largoMinimo,
  validarRun,
} from "./validators";

export interface ValoresUsuario {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  tipoUsuario: string;
  region: string;
  comuna: string;
  direccion: string;
}

export type ErroresUsuario = Record<keyof ValoresUsuario, string | null>;

export function validarUsuario(valores: ValoresUsuario): ErroresUsuario {
  const run = valores.run.trim();
  const nombre = valores.nombre.trim();
  const apellidos = valores.apellidos.trim();
  const correo = valores.correo.trim();
  const direccion = valores.direccion.trim();

  return {
    run:
      esRequerido(run) ||
      largoMinimo(run, 7) ||
      largoMaximo(run, 9) ||
      validarRun(run),
    nombre: esRequerido(nombre) || largoMaximo(nombre, 50),
    apellidos: esRequerido(apellidos) || largoMaximo(apellidos, 100),
    correo:
      esRequerido(correo) ||
      largoMaximo(correo, 100) ||
      dominioPermitido(correo),
    password:
      esRequerido(valores.password) ||
      largoMinimo(valores.password, 4) ||
      largoMaximo(valores.password, 10),
    fechaNacimiento: null,
    tipoUsuario: esRequerido(valores.tipoUsuario),
    region: esRequerido(valores.region),
    comuna: esRequerido(valores.comuna),
    direccion: esRequerido(direccion) || largoMaximo(direccion, 300),
  };
}

export function aValoresUsuario(usuario?: Usuario): ValoresUsuario {
  return {
    run: usuario?.run ?? "",
    nombre: usuario?.nombre ?? "",
    apellidos: usuario?.apellidos ?? "",
    correo: usuario?.correo ?? "",
    password: usuario?.password ?? "",
    fechaNacimiento: usuario?.fechaNacimiento ?? "",
    tipoUsuario: usuario?.tipoUsuario ?? "",
    region: usuario?.region ?? "",
    comuna: usuario?.comuna ?? "",
    direccion: usuario?.direccion ?? "",
  };
}

export function aUsuario(valores: ValoresUsuario): Usuario {
  return {
    run: valores.run.trim().toUpperCase(),
    nombre: valores.nombre.trim(),
    apellidos: valores.apellidos.trim(),
    correo: valores.correo.trim(),
    password: valores.password,
    fechaNacimiento: valores.fechaNacimiento,
    tipoUsuario: valores.tipoUsuario as TipoUsuario,
    region: valores.region,
    comuna: valores.comuna,
    direccion: valores.direccion.trim(),
  };
}
