export type Index = string | number | symbol;

export type Omit<R, O extends Index> = Pick<R, Exclude<keyof R, O>>;

export type Overwrite<A, B> = Pick<A, Exclude<keyof A, keyof B>> & B;

export type Diff<A, O extends Index> = Omit<A, O> & Partial<Omit<A, O>>;

export type Lacks<R, K extends Index> = Omit<R, K> & { [C in K]?: never };

export type Exact<T> = T & Record<never, never>;

export type KeysOfType<R, T> = {
  [K in keyof R]: R[K] extends T ? K : never;
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

type LiteralUnion = Index;
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

export type Cast<T1, T2> = T1 extends infer R
  ? R extends T2
    ? R
    : never
  : never;

export type Pretty<A> = { [K in keyof A]: A[K] };

/**
 * Use to prevent a usage of type `T` from being inferred in other generics.
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-520191642
 */
export type NoInfer<T> = T & { [K in keyof T]: T[K] };

export type JSONValue = string | number | boolean | JSONArray | JSONObject;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];
