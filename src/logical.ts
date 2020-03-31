export type ForceBoolean<A> = true extends A ? true : false;

export type Extends<A, B> = A extends B ? true : false;

export type Equals<A, B> = And<Extends<A, B>, Extends<B, A>>;

export type And<A extends boolean, B extends boolean> = ForceBoolean<
  A
> extends true
  ? ForceBoolean<B>
  : false;

export type Or<A extends boolean, B extends boolean> = ForceBoolean<
  A
> extends true
  ? true
  : ForceBoolean<B>;

export type Not<T extends boolean> = ForceBoolean<T> extends true
  ? false
  : true;

export type Xor<A, B> = Not<Equals<A, B>>;

export type If<C extends boolean, T, F> = ForceBoolean<C> extends true ? T : F;
