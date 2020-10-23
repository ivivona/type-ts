import { Throws, ExceptionsOf } from "../src/exceptions";

class CustomError extends Error {}

class CustomError2 extends Error {}

declare function unreliableFunction(): number & Throws<Error | CustomError>;

declare function anotherUnreliableFunction(): number &
  Throws<ExceptionsOf<typeof unreliableFunction> | CustomError2>;

// $ExpectType number & Throws<Error | CustomError>
const x = unreliableFunction();

// $ExpectType number
x + 1;

// $ExpectType number & Throws<Error | CustomError | CustomError2>
anotherUnreliableFunction();
