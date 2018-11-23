export interface Zero { isZero: true }
export interface Positive {
  isZero: false;
  prev: Nat;
}

export type Nat = Positive | Zero;

export interface Succ<N extends Nat> { prev: N; isZero: false }
export type Prev<N extends Positive> = N['prev'];
export type IsZero<N extends Nat> = N['isZero'];

export type _0 = Zero;
export type _1 = Succ<_0>;
export type _2 = Succ<_1>;
export type _3 = Succ<_2>;
export type _4 = Succ<_3>;
export type _5 = Succ<_4>;
export type _6 = Succ<_5>;
export type _7 = Succ<_6>;
export type _8 = Succ<_7>;
export type _9 = Succ<_8>;

export type Digit = _0 | _1 | _2 | _3 | _4 | _5 | _6 | _7 | _8 | _9;

export type Add<A extends Nat, B extends Nat> = {
  0: B;
  n: A extends Positive ? Add<Prev<A>, Succ<B>> : never;
}[IsZero<A> extends true ? 0 : 'n'];

type GT = 'GT';
type LT = 'LT';
type EQ = 'EQ';

type Compare<A extends Nat, B extends Nat> = A extends Positive
  ? B extends Positive
    ? {
      GT: Compare<Prev<A>, Prev<B>>[GT];
      LT: Compare<Prev<A>, Prev<B>>[LT];
      EQ: Compare<Prev<A>, Prev<B>>[EQ];
    }
    : { GT: true; LT: false; EQ: false }
  : B extends Positive
  ? { GT: false; LT: true; EQ: false }
  : { GT: false; LT: false; EQ: true };

export type GreaterThan<A extends Nat, B extends Nat> = Compare<A, B>[GT];

export type LowerThan<A extends Nat, B extends Nat> = Compare<A, B>[LT];

export type EqualsTo<A extends Nat, B extends Nat> = Compare<A, B>[EQ];

type SubsAcc<A extends Nat, B extends Nat> = IsZero<B> extends true
  ? { result: A }
  : A extends Positive
  ? B extends Positive
    ? { result: SubsAcc<Prev<A>, Prev<B>>['result'] }
    : never
  : never;

export type Substract<A extends Nat, B extends Nat> = GreaterThan<
  A,
  B
> extends true
  ? SubsAcc<A, B>['result']
  : EqualsTo<A, B> extends true
  ? Zero
  : never;

type MultiplyAcc<
  A extends Nat,
  B extends Nat,
  ACC extends Nat
> = B extends Positive
  ? {
    0: ACC;
    n: MultiplyAcc<A, Prev<B>, Add<ACC, A>>;
  }[B extends Positive ? 'n' : 0]
  : ACC;

export type Multiply<A extends Nat, B extends Nat> = MultiplyAcc<A, B, _0>;

// Euclidean division
type Div<A extends Nat, B extends Positive, Q extends Nat> = {
  end: Q;
  loop: Div<A, B, Add<Q, _1>>;
}[GreaterThan<Multiply<B, Add<Q, _1>>, A> extends true ? 'end' : 'loop'];

export type Quotient<A extends Nat, B extends Positive> = Div<A, B, _0>;

export type Remainder<A extends Nat, B extends Positive> = Substract<
  A,
  Multiply<B, Quotient<A, B>>
>;
