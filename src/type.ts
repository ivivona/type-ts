export type Omit<R, O extends string | number | symbol> = Pick<
  R,
  Exclude<keyof R, O>
>;

export type Overwrite<A, B> = Pick<A, Exclude<keyof A, keyof B>> & B;

export type Diff<A, O extends string | number | symbol> = Omit<A, O> &
  Partial<Omit<A, O>>;

export type Lacks<R, K extends string | number | symbol> = Omit<R, K> &
  { [C in K]?: never };

export type Exact<T> = T & Record<never, never>;

export type KeysOfType<R, T> = {
  [K in keyof R]: R[K] extends T ? K : never
}[keyof R];

export type DeepMutable<T> = { -readonly [K in keyof T]: DeepReadonly<T[K]> };
export type DeepReadonly<T> = { +readonly [K in keyof T]: DeepReadonly<T[K]> };
export type DeepRequired<T> = { [K in keyof T]-?: DeepRequired<T[K]> };
export type DeepPartial<T> = { [K in keyof T]+?: DeepRequired<T[K]> };

export type Difference<A, B> = Omit<A, keyof B>;
export type Union<A, B> = A & B;
export type Intersection<A, B> = Omit<
  A,
  keyof Union<Difference<A, B>, Difference<B, A>>
>;

type LiteralUnion = string | number | symbol;
export type SetDifference<
  A extends LiteralUnion,
  B extends LiteralUnion
> = A extends B ? never : A;
export type SetUnion<A extends LiteralUnion, B extends LiteralUnion> = A | B;
export type SetIntersection<
  A extends LiteralUnion,
  B extends LiteralUnion
> = A & B;

export type ValuesOf<R> = R extends { [K in keyof R]: infer V } ? V : never;
export type KeysOf<R> = keyof R;

export type ReturnType<F> = F extends (...a: any[]) => infer R ? R : never;
