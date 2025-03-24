import {
	Body,
	Controller,
	Get,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { IPublicUserData } from './interfaces/publicUserData.interface';
import { IPublicUserDataWithJwt } from '../auth/interfaces/publicUserDataWithJwt.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { AuthRequest } from '../auth/interfaces/AuthRequest.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenService } from '../token/token.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
	) {}

	@Get()
	async getUsers(): Promise<IPublicUserData[]> {
		return this.userService.getPublicUsers();
	}

	@Put('update')
	async updateUser(
		@Req() req: AuthRequest,
		@Body() dto: UpdateUserDto,
	): Promise<IPublicUserDataWithJwt> {
		const user = await this.userService.updateUser(req.user.uuid, dto);

		const jwt = this.tokenService.generateJWT({
			uuid: user.uuid,
			email: user.email,
			phoneNumber: user.phoneNumber,
			name: user.name,
			surname: user.surname,
			role: user.role,
		});

		return {
			userData: user,
			jwt,
		};
	}
}
