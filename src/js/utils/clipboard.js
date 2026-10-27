/** Copia texto al portapapeles. Devuelve true si se pudo, false si el navegador lo rechazó. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
