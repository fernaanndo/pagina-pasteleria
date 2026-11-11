import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectorRegionComuna from './SelectorRegionComuna'

const props = {
  region: '',
  comuna: '',
  onChangeRegion: () => {},
  onChangeComuna: () => {},
}

describe('SelectorRegionComuna', () => {
  test('la comuna parte deshabilitada si no hay región', () => {
    render(<SelectorRegionComuna {...props} />)
    expect(screen.getByLabelText('Comuna')).toBeDisabled()
  })

  test('muestra las comunas de la región recibida', () => {
    render(<SelectorRegionComuna {...props} region="Región de Arica y Parinacota" />)
    expect(screen.getByLabelText('Comuna')).toBeEnabled()
    expect(screen.getByRole('option', { name: 'Putre' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Iquique' })).not.toBeInTheDocument()
  })

  test('al cambiar de región avisa la nueva región y limpia la comuna', async () => {
    const onChangeRegion = vi.fn()
    const onChangeComuna = vi.fn()
    render(
      <SelectorRegionComuna
        {...props}
        region="Región de Arica y Parinacota"
        comuna="Putre"
        onChangeRegion={onChangeRegion}
        onChangeComuna={onChangeComuna}
      />,
    )
    await userEvent.selectOptions(screen.getByLabelText('Región'), 'Región de Tarapacá')
    expect(onChangeRegion).toHaveBeenCalledWith('Región de Tarapacá')
    expect(onChangeComuna).toHaveBeenCalledWith('')
  })

  test('muestra el error de región solo cuando lo recibe', () => {
    render(<SelectorRegionComuna {...props} errorRegion="Selecciona una región" />)
    expect(screen.getByLabelText('Región')).toHaveClass('is-invalid')
    expect(screen.getByText('Selecciona una región', { selector: '.invalid-feedback' })).toBeInTheDocument()
  })
})