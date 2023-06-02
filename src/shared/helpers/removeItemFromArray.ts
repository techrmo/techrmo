type Primitive = string | number | boolean | null | undefined

export const removeItemFromArray = <T extends Primitive, I extends T>(array: readonly T[], itemToRemove: I) => {
  return array.filter((item): item is Exclude<typeof array[number], I> => item !== itemToRemove)
}
