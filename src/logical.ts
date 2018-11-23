export type Extends<A, B> = A extends B ? true : false;

export type Equals<A, B> = And<Extends<A, B>, Extends<B, A>>;

export type And<A extends boolean, B extends boolean> = A extends true
  ? B
  : false;

export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B;

export type Not<T extends boolean> = T extends true ? false : true;

export type Xor<A, B> = Not<Equals<A, B>>;

export type If<C extends boolean, T, F> = C extends true ? T : F;
