import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ISaveUserData } from './interfaces/saveUserData.interface';
import { IPublicUserData } from './interfaces/publicUserData.interface';
import { IUpdateData } from './interfaces/update-data.interface';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findFirst({
			where: {
				email,
			},
		});
	}
	async getPublicUsers(): Promise<IPublicUserData[]> {
		return this.prisma.user.findMany({
			select: {
				uuid: true,
				email: true,
				name: true,
				surname: true,
				phoneNumber: true,
				role: true,
			},
		});
	}
	async updateUser(
		userUuid: string,
		updateData: IUpdateData,
	): Promise<IPublicUserData> {
		return this.prisma.user.update({
			data: updateData,
			where: {
				uuid: userUuid,
			},
			select: {
				uuid: true,
				email: true,
				name: true,
				surname: true,
				phoneNumber: true,
				role: true,
			},
		});
	}

	async saveUser(registerData: ISaveUserData): Promise<IPublicUserData> {
		return this.prisma.user.create({
			data: {
				...registerData,
			},
			omit: {
				hashedPassword: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async changePassword(email: string, newHashedPassword: string) {
		await this.prisma.user.update({
			data: {
				hashedPassword: newHashedPassword,
			},
			where: {
				email,
			},
		});
	}
}
