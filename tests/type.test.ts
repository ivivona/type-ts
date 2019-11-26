import { Equals } from "../src/logical";
import {
  Diff,
  Exact,
  Intersection,
  KeysOfType,
  Lacks,
  Omit,
  Overwrite,
  SetDifference,
  SetIntersection,
  SetUnion,
  ValuesOf,
} from "../src/type";
import { assertFalse, assertNever, assertTrue } from "./assert";

assertTrue<Equals<Omit<{ a: string; b: number }, "a">, { b: number }>>(); // $ExpectType true
// $ExpectType false
assertFalse<
  Equals<Omit<{ a: string; b: number }, "a">, { a: string; b: number }>
>();
// $ExpectType true
assertTrue<
  Equals<Omit<{ a: string; b: number }, "c">, { a: string; b: number }>
>();
assertTrue<Equals<Omit<{ a: string; b: number }, "a" | "b">, {}>>(); // $ExpectType true

// $ExpectType true
assertTrue<
  Equals<
    Overwrite<{ a: string; b: number; c: boolean }, { b: boolean }>,
    { a: string; b: boolean; c: boolean }
  >
>();

// $ExpectType true
assertTrue<
  Equals<Diff<{ a: string; b: number }, "b">, { a: string; b?: number }>
>();
assertTrue<Equals<Diff<{ a: string; b: number }, "b">, { a: string }>>(); // $ExpectType true

// $ExpectType false
assertFalse<
  Equals<Lacks<{ a: string; b: number }, "b">, { a: string; b?: number }>
>();
assertTrue<Equals<Lacks<{ a: string; b: number }, "b">, { a: string }>>(); // $ExpectType true
// $ExpectType false
assertFalse<
  Equals<Lacks<{ a: string; b: number }, "b">, { a: string; b: number }>
>();

type _E = Exact<{ a: string; b: number }>;
declare function testExact(e: _E): void;
testExact({}); // $ExpectError
testExact({ a: "" }); // $ExpectError
testExact({ a: "", b: 1, c: true }); // $ExpectError
testExact({ a: "", b: 1 });

// $ExpectType true
assertTrue<
  Equals<KeysOfType<{ a: number; b: number; c: boolean, e: string | number }, number>, "a" | "b">
>();

// interface A {
//   b: {
//     c: string;
//     d: Array<{ e: number }>;
//   };
// }
// type ReadonlyA = DeepReadonly<A>;
// declare const a: ReadonlyA;
// a.b.d[1].e = 1; // $ExpectError

// $ExpectType true
assertTrue<
  Equals<
    Intersection<{ a: number; b: number }, { b: number; c: number }>,
    { b: number }
  >
>();

assertNever<SetIntersection<"a" | "b", "c" | "d">>();
assertTrue<Equals<SetIntersection<"a" | "b", "b" | "c">, "b">>(); // $ExpectType true
assertTrue<Equals<SetIntersection<"a" | "b" | "c" , "b" | "c">, "b" | "c">>(); // $ExpectType true

assertTrue<Equals<SetDifference<"a" | "b", "c">, "a" | "b">>(); // $ExpectType true
assertTrue<Equals<SetDifference<"a" | "b", "b">, "a">>(); // $ExpectType true

assertTrue<Equals<SetUnion<"a" | "b", "b" | "c">, "a" | "b" | "c">>(); // $ExpectType true

// $ExpectType true
assertTrue<
  Equals<
    ValuesOf<{ a: number; b: boolean; c: string; d: number }>,
    number | boolean | string
  >
>();
