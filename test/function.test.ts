import { Curry, Func } from "../src/function";
import { assertTrue } from "./assert";
import { Extends } from "../src/logical";

declare function testA(
  a: string,
  b: number,
  c: string,
  d: boolean
): Record<string, unknown>;

declare function curry<F extends Func>(f: F): Curry<F>;

const curriedA = curry(testA);

type ParamsA = Parameters<typeof curriedA>;

assertTrue<Extends<[string, number, string, boolean], ParamsA>>();
assertTrue<Extends<[string, number, string], ParamsA>>();
assertTrue<Extends<[string, number], ParamsA>>();
assertTrue<Extends<[string], ParamsA>>();
