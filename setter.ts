
export interface Setter<A, B> {
    to(b: B): A
    set<C extends keyof B>(c: C): Setter<A, B[C]>
}

export function makeSetters<T>(target: T) {
    return function <P extends keyof T>(prop: P): Setter<T, T[P]> {
        return {
            to: value => ({
                ...target,
                [prop]: value
            }),
            set: prop2 => transform(makeSetters(target[prop])(prop2), target, prop)
        }
    }
}

function transform<A, B extends keyof A, C>(s: Setter<A[B], C>, target: A, prop: B): Setter<A, C> {
    let to = (c: C) => ({
        ...target,
        [prop]: s.to(c)
    })
    return {
        to,
        set: (c:any) => transform(s.set(c), target, prop)
    }
}
