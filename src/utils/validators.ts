export function esRequerido(valor: string) {
    if (valor.trim() === "") return "Este campo es obligatorio";
    return null;
}
export function largoMinimo(valor: string, min: number) {
    if (valor.length < min) return `Debe tener al menos ${min} caracteres`;
    return null;
}

export function largoMaximo(valor: string, max: number) {
    if (valor.length > max) return `Máximo ${max} caracteres (llevas ${valor.length})`;
    return null;
}

export function esEntero(valor: string) {
    if (!/^\d+$/.test(valor)) return "Debe ser un número entero, sin decimales";
    return null;
}

export function esDecimal(valor: string) {
    if (!/^\d+([.,]\d+)?$/.test(valor)) return "Debe ser un número, por ejemplo 4500 o 4500.50";
    return null;
}

export function esMayorIgualQue(valor: string, min: number) {
    if (Number(valor.replace(",", ".")) < min) return `Debe ser mayor o igual a ${min}`;
    return null;
}

export function dominioPermitido(correo: string) {
    const dominios = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
    const permitido = dominios.some((dominio) => correo.endsWith("@" + dominio));
    if (!permitido) return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    return null;
}

// Valida un RUN chileno sin puntos ni guion, por ejemplo 12345678K
// El dígito verificador se calcula con el algoritmo módulo 11
export function validarRun(run: string) {
    if (!/^\d{6,8}[0-9K]$/i.test(run)) return "El RUN debe tener solo números y el dígito verificador, sin puntos ni guion";

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

    if (dv !== dvEsperado) return "El RUN no es válido, revisa el dígito verificador";
    return null;
}
