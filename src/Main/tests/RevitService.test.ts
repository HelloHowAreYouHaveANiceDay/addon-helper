import RevitService from '../RevitService';

describe('test folder locations', () => {
    test('revit 2020 exists', async () => {
        expect.assertions(1)
        const itExists = await RevitService.verify('2020')
        expect(itExists).toBe(true)
    })
    
    test('revit 2019 does not exists', async () => {
        // expect.assertions(1)
        let err;
        try {
            await RevitService.verify('2019')
        } catch (error) {
            err = error       
        }
        expect(err).toBeDefined()
    })
})