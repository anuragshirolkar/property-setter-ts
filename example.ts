import { makeSetter } from "./setter"

interface Street {
    num: number
    name: string
}

interface Address {
    city: string
    street: Street
}

interface Company {
    name: string
    address: Address
}

interface Employee {
    name: string
    company: Company
}

const employee: Employee = {
    name: 'john',
    company: {
        name: 'awesome inc',
        address: {
            city: 'london',
            street: {
                num: 23,
                name: 'high street'
            }
        }
    }
}

let settableEmployee = makeSetter(employee)

// Update a deeply nested field.
let newEmployee = settableEmployee.set("company").set("address").set("street").set("num").to(3)

console.log(employee.company.address.street.num) // prints 23
console.log(newEmployee.company.address.street.num) // prints 3

