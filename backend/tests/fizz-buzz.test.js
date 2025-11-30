import fizzBuzz from "../playground/fizz.js";

describe("FizzBuzz", () => {
  it("should throw error if input is not a number", () => {
    expect(() => fizzBuzz("s")).toThrow();
    expect(()=>fizzBuzz(null)).toThrow();
    expect(()=>fizzBuzz(undefined)).toThrow();
    expect(()=>fizzBuzz({})).toThrow();
    expect(()=>fizzBuzz(null)).toThrow();
  });
  it("should return FizzBuzz if input is divisible by both 3 and 5", () => {
    const result=fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is just divisible by 3",()=>{
    const result=fizzBuzz(9);
    expect(result).toBe("Fizz");

  });

  it("should return Buzz if input is just divisible by 5",()=>{
      const result=fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return input itself if it's number but is neither divisible by 5 nor by 3",()=>{
    const result =fizzBuzz(2);
    expect(result).toBe(2);
  })
});
