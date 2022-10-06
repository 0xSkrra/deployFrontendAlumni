    export interface Endpoints {
    }

    export interface RefreshTokenParsed {
        exp: number;
        iat: number;
        jti: string;
        iss: string;
        aud: string;
        sub: string;
        typ: string;
        azp: string;
        nonce: string;
        session_state: string;
        scope: string;
        sid: string;
    }

    export interface IdTokenParsed {
        exp: number;
        iat: number;
        auth_time: number;
        jti: string;
        iss: string;
        aud: string;
        sub: string;
        typ: string;
        azp: string;
        nonce: string;
        session_state: string;
        at_hash: string;
        acr: string;
        sid: string;
        email_verified: boolean;
        name: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        email: string;
    }

    export interface RealmAccess {
        roles: string[];
    }

    export interface Account {
        roles: string[];
    }

    export interface ResourceAccess {
        account: Account;
    }

    export interface TokenParsed {
        exp: number;
        iat: number;
        auth_time: number;
        jti: string;
        iss: string;
        aud: string;
        sub: string;
        typ: string;
        azp: string;
        nonce: string;
        session_state: string;
        acr: string;
        allowed_origins: string[];
        realm_access: RealmAccess;
        resource_access: ResourceAccess;
        scope: string;
        sid: string;
        email_verified: boolean;
        name: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        email: string;
    }

    export interface RealmAccess2 {
        roles: string[];
    }

    export interface Account2 {
        roles: string[];
    }

    export interface ResourceAccess2 {
        account: Account2;
    }

    export interface Keycloak {
        authenticated: boolean;
        silentCheckSsoRedirectUri: string;
        silentCheckSsoFallback: boolean;
        enableLogging: boolean;
        messageReceiveTimeout: number;
        responseMode: string;
        responseType: string;
        flow: string;
        authServerUrl: string;
        realm: string;
        clientId: string;
        endpoints: Endpoints;
        refreshToken: string;
        refreshTokenParsed: RefreshTokenParsed;
        idToken: string;
        idTokenParsed: IdTokenParsed;
        token: string;
        tokenParsed: TokenParsed;
        sessionId: string;
        subject: string;
        realmAccess: RealmAccess2;
        resourceAccess: ResourceAccess2;
        timeSkew: number;
    }

