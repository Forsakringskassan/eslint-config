export function createCounter(): {
    readonly count: number;
    increment: () => number;
} {
    let count = $state(0);

    return {
        get count() {
            return count;
        },
        increment: () => (count += 1),
    };
}
