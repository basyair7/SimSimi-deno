export default class createText {
    private filePath: string;
    private encoder: TextEncoder;

    constructor(_filePath: string) {
        this.encoder = new TextEncoder();
        this.filePath = _filePath;
    }

    async writeToFile(content: string): Promise<string> {
        try {
            await Deno.writeFile(this.filePath, this.encoder.encode(content));
            return `File has been created and written to "${this.filePath}"`;
        } catch (error) {
            return `Error : ${error}`;
        }
    }
}