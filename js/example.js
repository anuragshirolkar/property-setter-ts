"use strict";
exports.__esModule = true;
exports.employee = void 0;
var setter_1 = require("./setter");
exports.employee = {
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
};
if (setter_1.makeSetters) {
    var settableEmployee = setter_1.makeSetters(exports.employee);
    var newEmployee = settableEmployee("company").set("address").set("street").set("num").to(3);
    console.log(exports.employee.company.address.street.num);
    console.log(newEmployee.company.address.street.num);
}
