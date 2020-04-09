import fs from 'fs';
import path from 'path';

// checks revit things things 
export default class RevitService {
    static verify(version: string) {
        return new Promise((res, rej) => {
            if (version == '2020') {
                const revitPath = 'c:\\Program Files\\Autodesk\\Revit 2020\\Revit.exe';
                fs.access(revitPath, (err) => {
                    if (err) {
                        res(false)
                    }
                    res(true)
                })
            }
            
            if (version == '2019') {
                const revitPath = 'c:\\Program Files\\Autodesk\\Revit 2019\\Revit.exe';
                fs.access(revitPath, (err) => {
                    if (err) {
                        res(false)
                    }
                    res(true)
                })
            }
        })
    }
}
