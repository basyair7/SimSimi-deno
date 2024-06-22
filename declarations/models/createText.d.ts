declare class createText {
    private filePath: string;
    private encoder: TextEncoder;
    
    constructor(_filePath: string);

    public writeToFile(content: string): Promise<void>;
}