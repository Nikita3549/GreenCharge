import { UserRole } from '@prisma/client';

export interface IPublicUserData {
	uuid: string;
	email: string;
	name: string;
	surname: string;
	phoneNumber: string | null;
	role: UserRole;
}
