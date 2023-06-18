const convert = (value: number, from: unit, to: unit): number => {
  const factors = {
    mm: {
      mm: 1,
      cm: 0.1,
      in: 0.03937,
    },
    cm: {
      mm: 10,
      cm: 1,
      in: 0.3937,
    },
    in: {
      mm: 25.4,
      cm: 2.54,
      in: 1,
    },
  }
  return value * factors[from][to]
}

export default convert
