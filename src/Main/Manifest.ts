export interface Package {
    target: string,
    directory: string,
    files: [string]
}

export class Manifest {
    packages: [Package]
    
    constructor(manifest: string){
        this.packages = JSON.parse(manifest)['packages']
    }
    
    
    list(){
        return this.packages
    }
}

export class Package {
    
}
