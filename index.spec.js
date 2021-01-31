const evalJsonPath = require('./index')

describe('Date Translation', () => {
  const obj = {
    step1: {
      step2: {
        'pretty.nice-step': [
          {},
          {step3: 4}
        ]
      }
    }
  }

  test('simple case', () => {
    /* any not object, return undefined */
    expect(evalJsonPath(null, 'step1')).toBe(undefined)

    expect(evalJsonPath(undefined, 'step1')).toBe(undefined)

    expect(evalJsonPath(3, 'step1')).toBe(undefined)

    expect(evalJsonPath(false, 'step1')).toBe(undefined)

    const result = evalJsonPath(obj, 'step1')
    expect(result).toBe(obj.step1)
  })

  test('2 steps', () => {
    const result = evalJsonPath(obj, 'step1.step2')
    expect(result).toBe(obj.step1.step2)
  })

  test('nice-name steps', () => {
    const result = evalJsonPath(obj, 'step1.step2[pretty.nice-step]')
    expect(result).toBe(obj.step1.step2['pretty.nice-step'])
  })

  test('nice-name steps further', () => {
    const result = evalJsonPath(obj, 'step1.step2[pretty.nice-step][1].step3')
    expect(result).toBe(4)
  })

  test('any out of track', () => {
    const result = evalJsonPath(obj, 'step1.xxxxx[pretty.nice-step][1].step3')
    expect(result).toBe(undefined)
  })
})
