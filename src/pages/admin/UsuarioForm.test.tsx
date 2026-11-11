import { beforeEach, describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import UsuarioForm from './UsuarioForm'
import { usuarios } from '../../data/usuarios'

function renderizarEn(ruta: string) {
    render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route path="/admin/usuarios" element={<h1>Listado</h1>} />
                <Route path="/admin/usuarios/nuevo" element={<UsuarioForm />} />
                <Route path="/admin/usuarios/:run/editar" element={<UsuarioForm />} />
            </Routes>
        </MemoryRouter>,
    )
}

describe('UsuarioForm', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('al guardar vacío muestra los errores de los campos obligatorios', async () => {
        const user = userEvent.setup()
        renderizarEn('/admin/usuarios/nuevo')

        await user.click(screen.getByRole('button', { name: 'Guardar usuario' }))

        // run, nombre, apellidos, correo, contraseña, tipo, región, comuna y dirección
        expect(screen.getAllByText('Este campo es obligatorio')).toHaveLength(9)
    })

    test('al elegir una región se mantiene seleccionada y se habilita la comuna', async () => {
        const user = userEvent.setup()
        renderizarEn('/admin/usuarios/nuevo')

        await user.selectOptions(screen.getByLabelText('Región'), 'Región Metropolitana de Santiago')
        await user.selectOptions(screen.getByLabelText('Comuna'), 'Providencia')

        expect(screen.getByLabelText('Región')).toHaveValue('Región Metropolitana de Santiago')
        expect(screen.getByLabelText('Comuna')).toHaveValue('Providencia')
    })

    test('en modo edición carga el usuario y bloquea el RUN', () => {
        renderizarEn(`/admin/usuarios/${usuarios[0].run}/editar`)

        expect(screen.getByRole('heading', { name: 'Editar usuario' })).toBeInTheDocument()
        expect(screen.getByLabelText('RUN *')).toHaveAttribute('readonly')
        expect(screen.getByLabelText('Comuna')).toHaveValue(usuarios[0].comuna)
    })
})