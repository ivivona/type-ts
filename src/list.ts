import { _0, _1, Nat, Positive, Prev, Succ } from "./nat";
import { Cast } from "./type";

export type Head<T extends any[]> = T extends []
  ? never
  : T[0] extends infer E
  ? E
  : never;

export type Tail<T extends any[]> = {
  0: never;
  1: [];
  n: ((...t: T) => void) extends (t: any, ...ts: infer TS) => void ? TS : never;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];

export type Last<T extends any[]> = {
  0: never;
  1: Head<T>;
  n: Last<Tail<T>>;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];

export type Cons<H, T extends any[]> = ((h: H, ...t: T) => void) extends (
  ...ht: infer HT
) => void
  ? HT
  : never;

export type Drop<T extends any[], N extends Nat> = T extends []
  ? []
  : N extends Positive
  ? { 1: Tail<T>; n: Drop<Tail<T>, Prev<N>> }[N extends _1 ? 1 : "n"]
  : T;

type ReverseAcc<T extends any[], ACC extends any[]> = {
  0: ACC;
  1: Cons<Head<T>, ACC>;
  n: ReverseAcc<Tail<T>, Cons<Head<T>, ACC>>;
}[T extends [] ? 0 : T extends [any] ? 1 : "n"];
export type Reverse<T extends any[]> = ReverseAcc<T, []>;

type TakeAcc<
  T extends any[],
  N extends Nat,
  ACC extends any[]
> = N extends Positive
  ? T extends []
    ? ACC
    : {
        _1: Cons<Head<T>, ACC>;
        _N: TakeAcc<Tail<T>, Prev<N>, Cons<Head<T>, ACC>>;
      }[N extends _1 ? "_1" : "_N"]
  : ACC;
export type Take<T extends any[], N extends Nat> = TakeAcc<
  T,
  N,
  []
> extends infer R
  ? Reverse<Cast<R, any[]>>
  : never;

type ConcatAcc<T extends any[], ACC extends any[]> = {
  0: ACC;
  n: ConcatAcc<Tail<T>, Cons<Head<T>, ACC>>;
}[T extends [] ? 0 : "n"];
export type Concat<A extends any[], B extends any[]> = Reverse<
  A
> extends infer R
  ? ConcatAcc<Cast<R, any[]>, B>
  : never;

type ZipAcc<T extends any[], R extends any[], ACC extends any[]> = {
  "[] _": ACC;
  "_ []": ACC;
  "_ _": ZipAcc<Tail<T>, Tail<R>, Cons<[Head<T>, Head<R>], ACC>>;
}[T extends [] ? "[] _" : R extends [] ? "_ []" : "_ _"];
export type Zip<A extends any[], B extends any[]> = ZipAcc<
  A,
  B,
  []
> extends infer R
  ? Reverse<Cast<R, any[]>>
  : never;

type RepeatAcc<T, N extends Nat, ACC extends T[]> = N extends Positive
  ? {
      1: Cons<T, ACC>;
      n: RepeatAcc<T, Prev<N>, Cons<T, ACC>>;
    }[N extends _1 ? 1 : "n"]
  : ACC;
export type Repeat<T, N extends Nat> = RepeatAcc<T, N, []>;

type LengthAcc<T extends any[], ACC extends Nat> = {
  0: ACC;
  n: LengthAcc<Tail<T>, Succ<ACC>>;
}[T extends [] ? 0 : "n"];
export type LengthN<T extends any[]> = LengthAcc<T, _0>;

export type Length<L> = L extends any[] ? L["length"] : never;

type ConsTN<T, L extends T[], N extends Nat> = N extends Positive
  ? {
      0: L;
      n: ConsTN<T, Cons<T, L>, Prev<N>>;
    }[N extends Positive ? "n" : 0]
  : L;
export type TupleOf<T, L extends Nat> = L extends Positive
  ? ConsTN<T, [], L>
  : [];

export type Push<H, T extends any[]> = Cons<H, T> extends infer R
  ? R extends any[]
    ? Reverse<R>
    : never
  : never;
