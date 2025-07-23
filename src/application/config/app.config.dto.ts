export type ApplicationConfig = {
    production?: boolean;
    httpServer?: boolean;
    httpHost?: string;
    httpPort?: number;
    httpPrefix?: string;
    Database?: boolean;
    DBhost?: string;
    DBport?: number;
    DBusername?: string;
    DBpassword?: any;
    DBpoolSize?: number;
    DBdatabase?: string;
}
