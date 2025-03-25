export type AppPageComponentName = 'IndexPage' | 'DashboardPage' | 'SelectAddressComponent';
export interface IAppInterface {
    initialName: AppPageComponentName;
    initialData?: any;
    onDataChangeCallback?: (data: any) => void;
}

export interface AuthData {
    token: string;
    tenant_id: string;
    user_id: string;
    ttl: number;
}

export interface AuthContextType {
    authData: AuthData | null;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
}