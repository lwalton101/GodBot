import * as fs from 'fs';

export class Config {
    private configFile: string;
    private configData: Record<string, any>;

    constructor(configFile: string) {
        this.configFile = configFile;
        this.configData = this.loadConfig();
    }

    private loadConfig(): Record<string, any> {
        try {
            const data = fs.readFileSync(this.configFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    }

    private saveConfig(): void {
        fs.writeFileSync(this.configFile, JSON.stringify(this.configData, null, 2), 'utf-8');
    }

    setConfigOption(key: string, value: any): void {
        this.configData[key] = value;
        this.saveConfig();
    }

    getConfigOption(key: string): string {
        return this.configData[key];
    }

    getAllConfigOptions(): string[] {
        return Object.keys(this.configData);
    }

    getConfigData(): Record<string, any> {
        return this.configData;
    }

    hasConfigOption(key: string): boolean {
        return key in this.configData;
    }
}