import { Equals, And, Or, Not, Xor, If } from "../src/logical";
import { assertTrue, assertFalse } from "./assert";

assertTrue<Equals<true, true>>(); // $ExpectType true
assertFalse<Equals<{ a: number }, true>>(); // $ExpectType false

assertTrue<And<true, true>>(); // $ExpectType true
assertFalse<And<false, true>>(); // $ExpectType false
assertFalse<And<false, false>>(); // $ExpectType false
assertFalse<And<true, false>>(); // $ExpectType false

assertTrue<Or<true, true>>(); // $ExpectType true
assertTrue<Or<false, true>>(); // $ExpectType true
assertFalse<Or<false, false>>(); // $ExpectType false
assertTrue<Or<true, false>>(); // $ExpectType true

assertTrue<Not<false>>(); // $ExpectType true
assertTrue<Not<Not<true>>>(); // $ExpectType true

assertFalse<Xor<true, true>>(); // $ExpectType false
assertTrue<Xor<false, true>>(); // $ExpectType true
assertTrue<Xor<true, false>>(); // $ExpectType true
assertFalse<Xor<false, false>>(); // $ExpectType false

assertTrue<Equals<If<true, number, string>, number>>(); // $ExpectType true
assertTrue<Equals<If<false, number, string>, string>>(); // $ExpectType true
