export interface IDatabaseConfig {
    getConnectionString(): string;
    getOptions(): object;
}
