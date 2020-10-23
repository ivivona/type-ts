import { Func } from "./function";

const throwType: unique symbol = Symbol("__ERROR_TYPE__");
export type Throws<E = Error> = {
  [throwType]?: E;
};

export type ExceptionsOf<T extends Func> = ReturnType<T> extends Throws<infer E>
  ? E
  : never;
