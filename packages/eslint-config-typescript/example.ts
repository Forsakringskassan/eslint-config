/**
 * This is a sample file
 */
import { type FooInterface, Component } from "@/components";
import { hash, add, take, join } from "./utils";

/* variables with _ prefix should be allowed to be unused */
function sink(..._unused: unknown[]): void {
    /* do nothing */
}

enum MyEnum {
    FOO,
    BAR,
}

export const myVar = 0;
export const unknownOrNull: unknown | null = null;
export const plainArray: string[] = [];
export const complexArray: Array<{ foo: string }> = [];

export class Foo extends Component implements FooInterface {
    /**
     * Brief description of function.
     *
     * Optional longer description with more details, examples and other
     * relevant information.
     *
     * @param value - Description of parameter
     * @returns Description of return value
     */
    public myMethod(value: string): string {
        return hash(value);
    }

    private async greet(to: string, from: string[]): Promise<string> {
        const joined = await join(from);
        return `Hello, ${to} from ${joined}`;
    }

    public static async myStaticFunction(): Promise<void> {
        function nestedFunction<T>(a: T, b: T): T {
            return add(a, b);
        }

        let x = nestedFunction(1, 2);

        const foo = new Foo();
        while (x-- < 10) {
            await foo.greet("me", ["you"]);
        }
    }
}

export function* fibonacci(current = 1, next = 1): Generator<number> {
    yield current;
    yield* fibonacci(next, current + next);
}

export function handleMyEnum(value: MyEnum): string {
    switch (value) {
        case MyEnum.FOO:
            return "foo";
        case MyEnum.BAR:
            return "bar";
    }
    /* the rest of the function is dead as all possible values of `MyEnum` are
     * checked, should not yield any errors */
}

export const [first, second, ...rest] = take(fibonacci(), 10);

/* "a" should be allowed to be unused as the `{ a, ...spread }` statement to get
 * a new object without "a" present. */
const foo = { a: 1, b: 2, c: 3 };
const { a, ...fooWithoutA } = foo;

sink(fooWithoutA);

export function callbackWithoutThis(this: void): void {
    /* do nothing */
}

export function overloaded(a: number): void;
export function overloaded(b: string): void;
export function overloaded(_value: number | string): void {
    /* do nothing */
}

/* 5 params should be ok (excluding this) */
export function withManyParams(
    this: void,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
): number[] {
    return [a, b, c, d, e];
}

export function fnExpectingVoidCallback(cb: () => void): void {
    cb();
}

fnExpectingVoidCallback(async () => {
    await Promise.resolve();
});
