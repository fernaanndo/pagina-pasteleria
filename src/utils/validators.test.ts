import { describe, expect, test } from 'vitest'
import { validarRun } from './validators'

describe('validarRun', () => {
  test('acepta un RUN válido', () => {
    expect(validarRun('123456785')).toBeNull()
  })
  test('rechaza un dígito verificador incorrecto', () => {
    expect(validarRun('123456780')).toContain('no es válido')
  })
})


