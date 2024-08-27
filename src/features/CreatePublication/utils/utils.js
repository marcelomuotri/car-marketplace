export const reorderOptions = (
  options,
  key = 'value',
  targetValue = 'otros'
) => {
  // Primero, encontrar el índice de la opción que queremos mover al final
  const targetIndex = options.findIndex((option) => option[key] === targetValue)

  // Si la opción existe y no está ya al final, moverla al final
  if (targetIndex >= 0 && targetIndex !== options.length - 1) {
    const targetOption = options.splice(targetIndex, 1)[0] // Eliminar la opción del array
    options.push(targetOption) // Añadir la opción al final del array
  }

  return options
}
