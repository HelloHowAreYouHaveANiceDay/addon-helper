import FileService from '../FileService'
import path from 'path'

describe("file operations", () => {
    const testDir = process.cwd() + '/test_files/'
    const testDirectory = path.join(testDir,  '/test/')
    const testFile = path.join(testDir + 'file.txt')   
    const copyTargetDir = path.join(testDirectory + '/temp/')
    const copyTarget = path.join(testDir + '/temp/' + 'file.txt')   

    // make sure testing directory is clear
    beforeAll(async () => {
        try {
            await FileService.removedir(testDirectory)
            await FileService.removeFile(copyTarget)
            await FileService.removedir(copyTargetDir)
        }catch(err) {
            
        }
    })
    
    test('create a directory', async () => {
        const testDirectory = path.join(testDir,  '/test/')
        
        let err;
        try {
            await FileService.createdir(testDirectory);
        } catch (error) {
            err = error;
        }
        expect(err).toBeUndefined()
    })
    
    test('copy file to destination path', async () => {
        const copy = await FileService.copy(testFile)(copyTarget)
        expect(copy).toBe(true)
    })

    afterAll(async () => {
        try {
            await FileService.removedir(testDirectory)
            await FileService.removeFile(copyTarget)
            await FileService.removedir(copyTargetDir)
        }catch(err) {
        }      
    })

})

    
describe('manifest reading', () => {
    const testManifest = process.cwd() + '/test_files/example_package/manifest.json'
    
    test('read manifest', async () => {
        try {
            const manifest = await FileService.readJson(testManifest);
            expect(manifest).toBeDefined()
        } catch (error) {
            expect(error).toBeUndefined()
        }
    })
})