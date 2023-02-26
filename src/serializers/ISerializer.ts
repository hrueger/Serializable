export interface ISerializer {
    serialize: (data: Record<string, unknown>) => string;
    deserialize: (data: string) => Record<string, unknown>;
}
