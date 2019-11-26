import { Cons, Length, TupleOf } from "./list";
import { _0, Nat, Succ } from "./nat";

export type AsNumber<N extends Nat> = TupleOf<any, N> extends infer R
  ? Length<R>
  : never;

type SumC<N extends number, T extends unknown[], M extends Nat> = {
  true: M;
  false: SumC<N, Cons<any, T>, Succ<M>>;
}[N extends Length<T> ? "true" : "false"];
export type AsNat<N extends number> = N extends 0 ? _0 : SumC<N, [], _0>;
