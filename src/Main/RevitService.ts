import fs from 'fs';
import path from 'path';
import FileService from './FileService'

// checks revit things things 
export default class RevitService {
    static async verify(version: string) {
            if (version == '2020') {
                const revitPath = 'c:\\Program Files\\Autodesk\\Revit 2020\\Revit.exe';
                const exists = await FileService.exists(revitPath)
                return exists
            }
            
            if (version == '2019') {
                const revitPath = 'c:\\Program Files\\Autodesk\\Revit 2019\\Revit.exe';
                const exists = await FileService.exists(revitPath)
                return exists
            }
    }

    static install(version: string){
        // return async (package: )
    }
}
