export class SalaConfig {
    port: number;
    maxUsernameLength: number;
    maxMessageLength: number;
    defaultUsername: string;
    defaultWelcome: string;
    secretPass: string;
    maxFileSizeMb: number;

   

    constructor(
        port: number = 3000,
        maxUsernameLength: number = 20,
        maxMessageLength: number = 100,
        defaultUsername: string = "Anonymous",
        defaultWelcome: string = "Welcome to RutChat!!",
        secretPass: string = "secret",
        maxFileSizeMb: number = 50
    ) {
        this.port = port;
        this.maxUsernameLength = maxUsernameLength;
        this.maxMessageLength = maxMessageLength;
        this.defaultUsername = defaultUsername;
        this.defaultWelcome = defaultWelcome;
        this.secretPass = secretPass;
        this.maxFileSizeMb = maxFileSizeMb;
    }

    public setPort(port: number): this {
        this.port = port;
        return this;
    }

    public setMaxUsernameLength(maxUsernameLength: number): this {
        this.maxUsernameLength = maxUsernameLength;
        return this;
    }

    public setMaxMessageLength(maxMessageLength: number): this {
        this.maxMessageLength = maxMessageLength;
        return this;
    }

    public setDefaultUsername(defaultUsername: string): this {
        this.defaultUsername = defaultUsername;
        return this;
    }

    public setDefaultWelcome(defaultWelcome: string): this {
        this.defaultWelcome = defaultWelcome;
        return this;
    }

    public setSecretPass(secretPass: string): this {
        this.secretPass = secretPass;
        return this;
    }

    public setMaxFileSizeMb(maxFileSizeMb: number): this {
        this.maxFileSizeMb = maxFileSizeMb;
        return this;
    }

    public getPort(): number {
        return this.port;
    }

    public getMaxUsernameLength(): number {
        return this.maxUsernameLength;
    }

    public getMaxMessageLength(): number {
        return this.maxMessageLength;
    }

    public getDefaultUsername(): string {
        return this.defaultUsername;
    }

    public getDefaultWelcome(): string {
        return this.defaultWelcome;
    }

    public getSecretPass(): string {
        return this.secretPass;
    }

    public getMaxFileSizeMb(): number {
        return this.maxFileSizeMb;
    }

    

    public build(): SalaConfig {
        return new SalaConfig(
            this.port,
            this.maxUsernameLength,
            this.maxMessageLength,
            this.defaultUsername,
            this.defaultWelcome,
            this.secretPass,
            this.maxFileSizeMb
        );
    }
}
