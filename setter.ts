/**
 * Setter object for modifying a field of type `Prop` among the descendents
 * of the given Object of type `Obj`.
 */
export interface Setter<Obj, Field> {
    /**
     * Returns copy of Obj with the property updated to prop
     * @param prop new value of the field
     */
    to(prop: Field): Obj

    /**
     * @param subP descriptor of the subField to be updated
     */
    set<SubField extends keyof Field>(subP: SubField): Setter<Obj, Field[SubField]>
}

/**
 * Returns the settable version of the object
 * @param obj the object to be modified.
 */
export function makeSetter<Obj>(obj: Obj): Setter<Obj, Obj> {
    return {
        to: value => value,
        set: prop => transform(makeSetter(obj[prop]), obj, prop)
    }
}

function transform<A, B extends keyof A, C>(s: Setter<A[B], C>, target: A, prop: B): Setter<A, C> {
    let to = (c: C) => ({
        ...target,
        [prop]: s.to(c)
    })
    let set = (c:any) => transform(s.set(c), target, prop)
    return { to, set }
}
