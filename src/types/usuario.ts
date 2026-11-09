export type TipoUsuario = 'Administrador' | 'Vendedor' | 'Cliente'

export interface Usuario {
  run: string
  nombre: string
  apellidos: string
  correo: string
  fechaNacimiento: string
  tipoUsuario: TipoUsuario
  region: string
  comuna: string
  direccion: string
  password: string
}
