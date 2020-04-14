import fs from 'fs';
import path from 'path';
import FileService from './FileService'
import {app} from 'electron'

// checks revit things things 
export default class RevitService {
    // TODO: this thing is a mess, figure out a better way to abstract
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

    static getAddonPath(version: string) {
        if (version == '2020') {
            // const addonPath = path.join();
            const addonDirectory = "\\Autodesk\\Revit\\Addins\\2020"
            const userHome = app.getPath('appData');
            return path.join(userHome, addonDirectory)
        }
        return ''
        // if (version == '2019') {
        //     const revitPath = 'c:\\Program Files\\Autodesk\\Revit 2019\\Revit.exe';
        //     const exists = await FileService.exists(revitPath)
        //     return exists
        // }

    }
}
