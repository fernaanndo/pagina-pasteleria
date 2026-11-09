import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import CampoFormulario from "./CampoFormulario";

const props = { id: 'nombre', label: 'Nombre', value: '', onChange: () => { } }

describe('CampoFormulario', () => {
  test('asocia el label con el input', () => {
    render(<CampoFormulario {...props} />)
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
  })

  test('no muestra error si no lo recibe', () => {
    render(<CampoFormulario {...props} />)
    expect(screen.getByLabelText('Nombre')).not.toHaveClass('is-invalid')
  })

  test('muestra el error cuando lo recibe', () => {
    render(<CampoFormulario {...props} error="Campo obligatorio" />)
    expect(screen.getByText('Campo obligatorio')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveClass('is-invalid')
  })

  test('llama a onChange con lo que escribe el usuario', async () => {
    const onChange = vi.fn()
    render(<CampoFormulario {...props} onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'A')
    expect(onChange).toHaveBeenCalledWith('A')
  })
})