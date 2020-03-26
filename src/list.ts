/* eslint-disable @typescript-eslint/no-explicit-any */
import { _0, _1, Nat, Positive, Prev, Succ } from "./nat";
import { Cast } from "./type";

export type Tuple<A> = readonly A[] & { 0: A };

export type StaticArray<A> = Tuple<A> | [];

export type AnyStaticArray = StaticArray<any>;

export type Head<T extends AnyStaticArray> = T extends []
  ? never
  : T[0] extends infer E
  ? E
  : never;

export type Tail<T extends AnyStaticArray> = {
  0: never;
  1: [];
  n: ((...t: T) => void) extends (t: any, ...ts: infer TS) => void
    ? Cast<TS, AnyStaticArray>
    : never;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];

export type Last<T extends AnyStaticArray> = {
  0: never;
  1: Head<T>;
  n: Last<Tail<T>>;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];

export type Cons<H, T extends AnyStaticArray> = ((
  h: H,
  ...t: T
) => void) extends (...ht: infer HT) => void
  ? HT
  : never;

export type Drop<T extends AnyStaticArray, N extends Nat> = T extends []
  ? []
  : N extends Positive
  ? { 1: Tail<T>; n: Drop<Tail<T>, Prev<N>> }[N extends _1 ? 1 : "n"]
  : T;

type ReverseAcc<T extends AnyStaticArray, ACC extends AnyStaticArray> = {
  0: ACC;
  1: Cons<Head<T>, ACC>;
  n: ReverseAcc<Tail<T>, Cons<Head<T>, ACC>>;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];
export type Reverse<T extends AnyStaticArray> = ReverseAcc<T, []>;

type TakeAcc<
  T extends AnyStaticArray,
  N extends Nat,
  ACC extends AnyStaticArray
> = N extends Positive
  ? T extends []
    ? ACC
    : {
        _1: Cons<Head<T>, ACC>;
        _N: TakeAcc<Tail<T>, Prev<N>, Cons<Head<T>, ACC>>;
      }[N extends _1 ? "_1" : "_N"]
  : ACC;
export type Take<T extends AnyStaticArray, N extends Nat> = TakeAcc<
  T,
  N,
  []
> extends infer R
  ? Reverse<Cast<R, AnyStaticArray>>
  : never;

type ConcatAcc<T extends AnyStaticArray, ACC extends AnyStaticArray> = {
  0: ACC;
  n: ConcatAcc<Tail<T>, Cons<Head<T>, ACC>>;
}[T extends [] ? 0 : "n"];
export type Concat<
  A extends AnyStaticArray,
  B extends AnyStaticArray
> = Reverse<A> extends infer R ? ConcatAcc<Cast<R, AnyStaticArray>, B> : never;

type ZipAcc<
  T extends AnyStaticArray,
  R extends AnyStaticArray,
  ACC extends AnyStaticArray
> = {
  "[] _": ACC;
  "_ []": ACC;
  "_ _": ZipAcc<Tail<T>, Tail<R>, Cons<[Head<T>, Head<R>], ACC>>;
}[T extends [] ? "[] _" : R extends [] ? "_ []" : "_ _"];
export type Zip<A extends AnyStaticArray, B extends AnyStaticArray> = ZipAcc<
  A,
  B,
  []
> extends infer R
  ? Reverse<Cast<R, AnyStaticArray>>
  : never;

type RepeatAcc<
  T,
  N extends Nat,
  ACC extends StaticArray<T>
> = N extends Positive
  ? {
      1: Cons<T, ACC>;
      n: RepeatAcc<T, Prev<N>, Cons<T, ACC>>;
    }[N extends _1 ? 1 : "n"]
  : ACC;
export type Repeat<T, N extends Nat> = RepeatAcc<T, N, []>;

type LengthAcc<T extends AnyStaticArray, ACC extends Nat> = {
  0: ACC;
  n: LengthAcc<Tail<T>, Succ<ACC>>;
}[T extends [] ? 0 : "n"];
export type LengthN<T extends AnyStaticArray> = LengthAcc<T, _0>;

export type Length<L> = L extends AnyStaticArray ? L["length"] : never;

type ConsTN<T, L extends StaticArray<T>, N extends Nat> = N extends Positive
  ? {
      0: L;
      n: ConsTN<T, Cons<T, L>, Prev<N>>;
    }[N extends Positive ? "n" : 0]
  : L;
export type TupleOf<T, L extends Nat> = L extends Positive
  ? ConsTN<T, [], L>
  : [];

export type Push<H, T extends AnyStaticArray> = Reverse<T> extends infer R
  ? R extends AnyStaticArray
    ? Cons<H, R> extends infer RC
      ? RC extends AnyStaticArray
        ? Reverse<RC>
        : never
      : never
    : never
  : never;
