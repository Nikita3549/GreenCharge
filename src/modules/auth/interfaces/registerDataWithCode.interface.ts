export interface IRegisterDataWithCode {
	code: number;
	registerData: {
		email: string;
		hashedPassword: string;
		name: string;
		surname: string;
		phoneNumber: string;
	};
}
