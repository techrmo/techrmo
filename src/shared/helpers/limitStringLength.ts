type GetStringLength<
  S extends string,
  Result extends string[] = []
> = S extends `${infer firstLetter}${infer restString}`
  ? GetStringLength<restString, [...Result, firstLetter]>
  : Result['length'];

type CheckStringLength<
  S extends string,
  Length extends number
> = GetStringLength<S> extends Length ? S : never;

export type CheckStringHaveOneChar<T extends string> =
  T extends CheckStringLength<T, 1> ? T : 'Should have only one char';
