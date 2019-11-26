import {
  Concat,
  Cons,
  Drop,
  Head,
  Last,
  Length,
  LengthN,
  Repeat,
  Reverse,
  Tail,
  Take,
  Zip
} from "../src/list";
import { Equals } from "../src/logical";
import { _0, _1, _2, _3, _9, Add, Multiply } from "../src/nat";
import { assertFalse, assertNever, assertTrue } from "./assert";

assertNever<Head<[]>>();
assertTrue<Equals<Head<[1, 2, 3]>, 1>>(); // $ExpectType true
assertFalse<Equals<Head<[1, 2, 3]>, 2>>(); // $ExpectType false
assertFalse<Equals<Head<[number, 2, 3]>, 1>>(); // $ExpectType false
assertTrue<Equals<Head<[string, 2, 3]>, string>>(); // $ExpectType true

assertNever<Tail<[]>>();
assertTrue<Equals<Tail<[1, 2]>, [2]>>(); // $ExpectType true
assertTrue<Equals<Tail<[1, 2, 3]>, [2, 3]>>(); // $ExpectType true

assertNever<Last<[]>>();
assertTrue<Equals<Last<[1, 2]>, 2>>(); // $ExpectType true
assertTrue<Equals<Last<[1, 2, 3]>, 3>>(); // $ExpectType true

assertTrue<Equals<Cons<1, []>, [1]>>(); // $ExpectType true
assertTrue<Equals<Cons<1, Cons<2, []>>, [1, 2]>>(); // $ExpectType true
assertTrue<Equals<Cons<1, [2, 3]>, [1, 2, 3]>>(); // $ExpectType true

assertTrue<Equals<Cons<1, []>, [1]>>(); // $ExpectType true
assertTrue<Equals<Cons<1, Cons<string, []>>, [1, string]>>(); // $ExpectType true
assertTrue<Equals<Cons<1, [string, any]>, [1, string, any]>>(); // $ExpectType true

assertTrue<Equals<Drop<[], _2>, []>>(); // $ExpectType true
assertTrue<Equals<Drop<[1, 2], _1>, [2]>>(); // $ExpectType true
assertTrue<Equals<Drop<[1, 2, 3], _2>, [3]>>(); // $ExpectType true

assertTrue<Equals<Reverse<[]>, []>>(); // $ExpectType true
assertTrue<Equals<Reverse<[1, 2]>, [2, 1]>>(); // $ExpectType true
assertTrue<Equals<Reverse<[1, 2, 3]>, [3, 2, 1]>>(); // $ExpectType true

assertTrue<Equals<Take<[], _2>, []>>(); // $ExpectType true
assertTrue<Equals<Take<[1, 2], _1>, [1]>>(); // $ExpectType true
assertTrue<Equals<Take<[1, 2, 3], _2>, [1, 2]>>(); // $ExpectType true

assertTrue<Equals<Concat<[], []>, []>>(); // $ExpectType true
assertTrue<Equals<Concat<[], [1]>, [1]>>(); // $ExpectType true
assertTrue<Equals<Concat<[2], [1]>, [2, 1]>>(); // $ExpectType true
assertTrue<Equals<Concat<[1, 2], [3]>, [1, 2, 3]>>(); // $ExpectType true
assertTrue<Equals<Concat<[1], [2, 3]>, [1, 2, 3]>>(); // $ExpectType true

assertTrue<Equals<Zip<[], []>, []>>(); // $ExpectType true
assertTrue<Equals<Zip<[], [1]>, []>>(); // $ExpectType true
assertTrue<Equals<Zip<[2], [1]>, [[2, 1]]>>(); // $ExpectType true
assertTrue<Equals<Zip<[1, 2], [3]>, [[1, 3]]>>(); // $ExpectType true
assertTrue<Equals<Zip<[1], [2, 3]>, [[1, 2]]>>(); // $ExpectType true
assertTrue<Equals<Zip<[1, 2], [3, 4]>, [[1, 3], [2, 4]]>>(); // $ExpectType true

assertTrue<Equals<Repeat<0, _0>, []>>(); // $ExpectType true
assertTrue<Equals<Repeat<0, _1>, [0]>>(); // $ExpectType true
assertTrue<Equals<Repeat<0, _2>, [0, 0]>>(); // $ExpectType true
assertTrue<Equals<Repeat<0, _3>, [0, 0, 0]>>(); // $ExpectType true

assertTrue<Equals<Length<[]>, 0>>(); // $ExpectType true
assertTrue<Equals<Length<[1]>, 1>>(); // $ExpectType true
assertTrue<Equals<Length<[1, 2]>, 2>>(); // $ExpectType true
assertTrue<Equals<Length<[1, 2, 3]>, 3>>(); // $ExpectType true
type _10 = Add<_9, _1>;
type _20 = Multiply<_10, _2>;
assertTrue<Equals<Length<Repeat<0, _20>>, 20>>(); // $ExpectType true

assertTrue<Equals<LengthN<[]>, _0>>(); // $ExpectType true
assertTrue<Equals<LengthN<[1]>, _1>>(); // $ExpectType true
assertTrue<Equals<LengthN<[1, 2]>, _2>>(); // $ExpectType true
assertTrue<Equals<LengthN<[1, 2, 3]>, _3>>(); // $ExpectType true
assertTrue<Equals<LengthN<Repeat<0, _20>>, _20>>(); // $ExpectType true
