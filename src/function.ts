/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyStaticArray,
  Drop,
  LengthN,
  Length,
  Cons,
  Head,
  Tail,
} from "./list";
import { Nat } from "./nat";
import { Cast } from "./type";

export type Func = (...a: any) => any;

type CurriedArgs<F extends Func> = Cons<
  Head<Parameters<F>>,
  Cast<Partial<Tail<Parameters<F>>>, any[]>
>;

export type Curry<F extends Func> = <A extends CurriedArgs<F>>(
  ...args: A
) => LengthN<Cast<A, AnyStaticArray>> extends infer L
  ? Drop<Parameters<F>, Cast<L, Nat>> extends infer R
    ? Length<Cast<R, AnyStaticArray>> extends 0
      ? ReturnType<F>
      : Curry<(...args: Cast<R, AnyStaticArray>) => ReturnType<F>>
    : ReturnType<F>
  : ReturnType<F>;

export type Uncurry<F extends Func> = F extends Curry<infer I> ? I : F;
