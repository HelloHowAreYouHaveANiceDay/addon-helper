import RevitService from '../RevitService';

describe('test folder locations', () => {
    test('revit 2020 exists', async () => {
        expect.assertions(1)
        const itExists = await RevitService.verify('2020')
        expect(itExists).toBe(true)
    })
    
    test('revit 2019 does not exists', async () => {
        expect.assertions(1)
        const itExists = await RevitService.verify('2019')
        expect(itExists).toBe(false)
    })
})
