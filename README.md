# type-ts

Typescript Type-level playground

This project is a playground of type-level operations for TypeScript.

## Installation

```
npm i type-ts
```

### TypeScript compatibility

The stable version is tested against TypeScript 3.1.6+.

## API

### Logic

#### Extends<A, B>

Returns `true` if `A` extends from `B`, `false` otherwise.

```ts
Extends<'foo', string> // true
Extends<string, number> // false
```

#### Equals<A, B>

Returns `true` if `A` and `B` are equal types, `false` otherwise.

```ts
Equals<string, string> // true
Equals<string, number> // false
```

#### And<A, B>

Returns `true` if `A` and `B` are equal types to `true`, `false` otherwise.

```ts
And<true, true> // true
And<true, false> // false
```

#### Or<A, B>

Returns `true` if either `A` or `B` are `true`, `false` otherwise.

```ts
Or<false, true> // true
Or<false, false> // false
```

#### Xor<A, B>

Returns `true` if `A` and `B` differ, one is `true` and the other is `false`. `false` otherwise.

```ts
Xor<false, true> // true
Xor<true, true> // false
```

#### Not\<A>

Returns `true` if `A` is `false`. `false` otherwise.

```ts
Not<false> // true
Not<true> // false
```

#### If<C, T, E>

Returns `T` if `C` is `true`. `E` otherwise.

```ts
If<true, number, string> // number
If<false, number, string> // string
```

### Newtype

#### Newtype<T, NAME>

Same representation, different type for the typesystem.

```ts
type USD = Newtype<number, "USD">;
type EUR = Newtype<number, "EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD; // We can treat them like the underlying type
}

gross(usd, usd); // $ExpectType Newtype<number, "USD">
// $ExpectError
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.
// $ExpectError
gross(1, 1.2); // Type 'number' is not assignable to type '"USD"'.
```

### Type

#### Omit<A, K>

Extracts a super-type of `A` identified by its keys `K`.

```ts
Omit<{ a: string; b: number }, 'a'> // { b: number }
```

#### Overwrite<A, B>

Overwrites `A` with the properties in `B`.

```ts
Overwrite<{ a: string; b: number }, { b: boolean }> // { a: string; b: boolean }
```

#### Diff<A, K>

Make the specified properties `K` partial in type `A`.

```ts
Diff<{ a: string; b: number }, 'b'> // { a: string; b?: number }
```

#### Lacks<A, K>

Encodes the constraint that a given object `A` does not contain specific keys `K`

```ts
declare function f(x: Lacks<{ a: string; b: number }, "a">): void;
// $ExpectError
f({ a: "foo", b: 1 });
```

#### Exact\<A>

Encodes that `A` cannot have extra propeties.

```ts
type E = Exact<{ a: string; b: number }>;
declare function f(a: E): void;
declare const x: { a: string };
declare const y: { a: string; b: number };
declare const z: { a: string; b: number; c: boolean };
f(x); // $ExpectError
f(y); // Ok
f(z); // $ExpectError
```

#### KeysOfType<A, B>

Picks from `A` only the keys of a certain type `B`.

```ts
KeysOfType<{a: string, b: string | boolean, c: boolean, d: string}, string> // "a" | "d"
```

#### DeepReadonly\<A>, DeepMutable\<A>, DeepRequired\<A>, DeepPartial\<A>

Recursively sets modifiers `readonly` and `?`.

```ts
interface A {
  b: {
    c: string;
    d: Array<{ e: number }>;
  };
}
type ReadonlyA = DeepReadonly<A>;
declare const a: ReadonlyA;
a.b.d[1].e = 1; // $ExpectError
```

#### Intersection<A, B>

Extracts from `A` only the properties found on `B`.

```ts
Intersection<{ a: number; b: number }, { b: number; c: number }> // { b: number }
```

#### ValuesOf\<A>

Returns the union of all value types from `A`.

```ts
ValuesOf<{ a: number; b: boolean; c: string; d: number }> // number | boolean | string
```

#### SetIntersection<A, B>

Intersection of the literal union sets `A` and `B`.

```ts
SetIntersection<"a" | "b", "c" | "d"> // never
SetIntersection<"a" | "b", "b" | "c"> // "b"
SetIntersection<"a" | "b" | "c" , "b" | "c"> // "b" | "c"
```

#### SetDifference<A, B>

Difference of the literal union sets `A` and `B`.

```ts
SetDifference<"a" | "b", "c"> // "a" | "b"
SetDifference<"a" | "b", "b"> // "a"
```

#### SetUnion<A, B>

Union of the literal union sets `A` and `B`.

```ts
SetUnion<"a" | "b", "b" | "c"> // "a" | "b" | "c"
```

#### Pretty\<A>

Display purpouse only. Useful when dealing with complex types and want to see something simpler in the IDE.

```ts
Pretty<{ a: 1 } & { b: 2 }> // { a: 1, b: 2 }
```

#### NoInfer\<A>

Use to prevent a usage of type `T` from being inferred in other generics. [See](https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-520191642)

#### JSONValue

Represents JSON representable types.

#### Awaited\<A>

Unwraps nested `Promise`s. Typescript does not collapse nested promises. [See](https://github.com/microsoft/TypeScript/pull/35998)

```ts
type x = Awaited<number>; // Promise<number>
type y = Awaited<Promise<Promise<Promise<string>>>>; // Promise<string>
type z = Awaited<Awaited<Awaited<boolean>>>; // Promise<boolean>
```

### Number

Peano numbers implementation.

#### Zero

Zero

#### Succ\<N>

```ts
Succ<Zero> // _1
```

#### Digit = \_0 | \_1 | \_2 | \_3 | \_4 | \_5 | \_6 | \_7 | \_8 | \_9

Predefined aliases.

#### Add<A, B>

```ts
Add<_4, _3> // _7
Add<_5, _4> // _9
```

#### Substract<A, B>

```ts
Substract<_0, _1> // never
Substract<_4, _3> // _1
Substract<_5, _2> // _3
```

#### Multiply<A, B>

```ts
Multiply<_2, _3> // _6
Multiply<_3, _3> // _9
```

#### Quotient<A, B>

```ts
Quotient<_4, _0> // never
Quotient<_3, _3> // _1
Quotient<_0, _6> // _0
Quotient<_4, _2> // _2
Quotient<_6, _5> // _1
```

#### Quotient<A, B>

```ts
Quotient<_3, _3> // _0
Quotient<_5, _3> // _2
Quotient<_4, _2> // _0
Quotient<_6, _5> // _1
```

#### GreaterThan<A, B>

```ts
GreaterThan<_1, _0> // true
GreaterThan<_5, _2> // true
GreaterThan<_0, _0> // false
GreaterThan<_0, _1> // false
```

#### LowerThan<A, B>

```ts
LowerThan<_1, _0> // false
LowerThan<_5, _2> // false
LowerThan<_0, _0> // false
LowerThan<_0, _1> // true
```

#### EqualsTo<A, B>

```ts
EqualsTo<_0, _1> // false
EqualsTo<_2, _2> // true
```

#### AsNat\<N>

Convert a `number` to a `Nat`. Do not use with negative numbers.

```ts
AsNat<2> // _2 or Succ<Succ<_0>>
```

#### AsNumbe\r<N>

Convert a `Nat` to a `number`.

```ts
AsNumber<_2> // 2
```

## Similar projects

- [`typelevel-ts`](https://github.com/gcanti/typelevel-ts).
- [`type-zoo`](https://github.com/pelotom/type-zoo)
- [`typical`](https://github.com/tycho01/typical)
- [`typepark`](https://github.com/kgtkr/typepark)
- [`ts-toolbelt`](https://github.com/pirix-gh/ts-toolbelt)
