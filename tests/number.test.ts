import { Equals } from "../src/logical";
import {
  _0,
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _9,
  Add,
  EqualsTo as EQ,
  GreaterThan as GT,
  LowerThan as LT,
  Multiply,
  Quotient,
  Remainder,
  Substract,
} from "../src/number";
import { assertFalse, assertNever, assertTrue } from "./assert";

assertTrue<Equals<Add<_0, _0>, _0>>(); // $ExpectType true
assertTrue<Equals<Add<_0, _1>, _1>>(); // $ExpectType true
assertTrue<Equals<Add<_2, _0>, _2>>(); // $ExpectType true
assertTrue<Equals<Add<_1, _1>, _2>>(); // $ExpectType true
assertTrue<Equals<Add<_4, _3>, _7>>(); // $ExpectType true
assertTrue<Equals<Add<_5, _4>, _9>>(); // $ExpectType true

assertTrue<GT<_1, _0>>(); // $ExpectType true
assertTrue<GT<_5, _2>>(); // $ExpectType true
assertFalse<GT<_0, _0>>(); // $ExpectType false
assertFalse<GT<_0, _1>>(); // $ExpectType false

assertFalse<LT<_1, _0>>(); // $ExpectType false
assertFalse<LT<_5, _2>>(); // $ExpectType false
assertFalse<LT<_0, _0>>(); // $ExpectType false
assertTrue<LT<_0, _1>>(); // $ExpectType true

assertFalse<EQ<_0, _1>>(); // $ExpectType false
assertTrue<EQ<_2, _2>>(); // $ExpectType true

assertTrue<Equals<Substract<_0, _0>, _0>>(); // $ExpectType true
assertNever<Substract<_0, _1>>();
assertTrue<Equals<Substract<_2, _0>, _2>>(); // $ExpectType true
assertTrue<Equals<Substract<_1, _1>, _0>>(); // $ExpectType true
assertTrue<Equals<Substract<_6, _3>, _3>>(); // $ExpectType true
assertTrue<Equals<Substract<_7, _2>, _5>>(); // $ExpectType true

assertTrue<Equals<Multiply<_0, _2>, _0>>(); // $ExpectType true
assertTrue<Equals<Multiply<_4, _0>, _0>>(); // $ExpectType true
assertTrue<Equals<Multiply<_0, _1>, _0>>(); // $ExpectType true
assertTrue<Equals<Multiply<_1, _3>, _3>>(); // $ExpectType true
assertTrue<Equals<Multiply<_5, _1>, _5>>(); // $ExpectType true
assertTrue<Equals<Multiply<_3, _2>, _6>>(); // $ExpectType true

assertNever<Quotient<_4, _0>>(); // $ExpectError
assertTrue<Equals<Quotient<_0, _2>, _0>>(); // $ExpectType true
assertTrue<Equals<Quotient<_0, _1>, _0>>(); // $ExpectType true
assertTrue<Equals<Quotient<_1, _3>, _0>>(); // $ExpectType true
assertTrue<Equals<Quotient<_5, _1>, _5>>(); // $ExpectType true
assertTrue<Equals<Quotient<_3, _2>, _1>>(); // $ExpectType true
assertTrue<Equals<Quotient<_6, _2>, _3>>(); // $ExpectType true
assertTrue<Equals<Quotient<_3, _3>, _1>>(); // $ExpectType true

assertTrue<Equals<Remainder<_0, _2>, _0>>(); // $ExpectType true
assertTrue<Equals<Remainder<_0, _1>, _0>>(); // $ExpectType true
assertTrue<Equals<Remainder<_1, _3>, _1>>(); // $ExpectType true
assertTrue<Equals<Remainder<_5, _3>, _2>>(); // $ExpectType true
assertTrue<Equals<Remainder<_3, _2>, _1>>(); // $ExpectType true
assertTrue<Equals<Remainder<_6, _2>, _0>>(); // $ExpectType true
assertTrue<Equals<Remainder<_3, _3>, _0>>(); // $ExpectType true
