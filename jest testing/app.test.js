const add = require("./add");

test("it should return 3 when operands are 1 and 2", () => {
    expect(add(1, 2)).toBe(3);
});

test("should throw TypeError for NaN", () => {
    expect(() => add(NaN, 2)).toThrow(TypeError);
});
// or to check one complete function
describe("add",()=>{
test("it should return 3 when operands are 1 and 2", () => {
    expect(add(1, 2)).toBe(3);
});

test("should throw TypeError for NaN", () => {
    expect(() => add(NaN, 2)).toThrow(TypeError);
});
})