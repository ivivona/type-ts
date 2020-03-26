import { Equals } from "../src/logical";
import { _0, _1, _2 } from "../src/nat";
import { AsNat, AsNumber } from "../src/number";
import { assertTrue } from "./assert";

assertTrue<Equals<AsNumber<_0>, 0>>();
assertTrue<Equals<AsNumber<_1>, 1>>();
assertTrue<Equals<AsNumber<_2>, 2>>();

assertTrue<Equals<AsNat<0>, _0>>();
assertTrue<Equals<AsNat<1>, _1>>();
assertTrue<Equals<AsNat<2>, _2>>();
