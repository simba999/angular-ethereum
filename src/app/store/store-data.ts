export interface UserState {
    installed: boolean;
    unlocked: boolean;
    showAddressForm: boolean;
    walletAddress: String;
    balance: number;
    gzrBalance: number;
    nickName: String;
    transactionId: String;
    validNetwork: boolean;
    signup: boolean;
}

export const INITIAL_USER_STATE: UserState = {
    installed: true,
    unlocked: true,
    showAddressForm: false,
    walletAddress: '',
    balance: 0,
    gzrBalance: 0,
    nickName: '',
    transactionId: '',
    validNetwork: true,
    signup: false
};
