import { describe, expect, test } from 'vitest'
import { aUsuario, aValoresUsuario, validarUsuario } from './formularioUsuario'
import { usuarios } from '../data/usuarios'

describe('formularioUsuario', () => {
  test('un usuario existente no tiene errores', () => {
    const errores = validarUsuario(aValoresUsuario(usuarios[0]))
    expect(Object.values(errores).every((e) => e === null)).toBe(true)
  })

  test('rechaza un RUN con dígito verificador incorrecto y un correo de otro dominio', () => {
    const errores = validarUsuario({ ...aValoresUsuario(usuarios[0]), run: '123456780', correo: 'ana@hotmail.com' })
    expect(errores.run).toBe('El RUN no es válido, revisa el dígito verificador')
    expect(errores.correo).toMatch(/Solo se permiten correos/)
  })

  test('convierte el RUN a mayúsculas al guardar', () => {
    const usuario = aUsuario({ ...aValoresUsuario(usuarios[0]), run: ' 12345678k ' })
    expect(usuario.run).toBe('12345678K')
  })
})