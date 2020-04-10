import fs from 'fs'
import path from 'path'
import util from 'util'

const copyFilePromise = util.promisify(fs.copyFile)

export default class FileService {
    static copy(inputPath: string){
        return async (outputPath: string) => {
            try {
                // ensure input file exists
                await FileService.exists(inputPath);
                // ensure output directory exists
                const directory = path.dirname(outputPath);
                
                try {
                    // directory exists we're good
                    await FileService.exists(directory)
                } catch (error) {
                    // create directory
                    await FileService.createdir(directory)
                }

                // copy the file
                await copyFilePromise(inputPath, outputPath)
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }

    static async createdir(directoryPath: string) {
        try {
            await util.promisify(fs.mkdir)(directoryPath)
        } catch (error) {
            throw error
        }
    }

    static async removedir(directoryPath: string) {
        try {
            await util.promisify(fs.rmdir)(directoryPath)
        } catch (error) {
            throw error
        }
    }

    static async removeFile (filePath: string) {
        try {
            await util.promisify(fs.unlink)(filePath)
        } catch (error) {
            throw error
        }
    }

    static async exists(targetPath: string){
        try {
            const access = util.promisify(fs.access)
            await access(targetPath)
            return true
        } catch (error) {
            throw error
        }
    }  
}
