import { Newtype } from "../src/newtype";

type USD = Newtype<number, "USD">;
type EUR = Newtype<number, "EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD;
}

gross(usd, usd); // $ExpectType Newtype<number, "USD">
// $ExpectError
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.
// $ExpectError
gross(1, 1.2);
