import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';

import { AuthDto, UpdateMyUserDto } from './dto';

import { PrismaService } from '../prisma/prisma.service';
import { FRONTEND_MENU, Menu } from './constants';
import { JwtPayload } from './interfaces';
import { UserRole } from '../users/domain';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login({ login, password }: AuthDto) {
    const user = await this.prisma.user.findFirst({ where: { login } });
    if (!user) {
      throw new BadRequestException('Usuario o Contraseña incorrectos');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Usuario o Contraseña incorrectos');
    }
    if (!user.active) {
      throw new BadRequestException('La cuenta ha sido deshabilidata');
    }
    return { token: this.generateToken(user) };
  }

  async checkAuthStatus(user: User) {
    return {
      token: this.generateToken(user),
      menu: this.getFrontMenu(user.roles as UserRole[]),
      roles: user.roles,
      mustChangePassword: user.mustChangePassword,
    };
  }

  async updateMyUser(id: number, data: UpdateMyUserDto) {
    const { password } = data;
    const encryptedPassword = await this.encryptPassword(password);
    await this.prisma.user.update({where:{id}, data: { password: encryptedPassword }});
    return { message: 'Contraseña actualizada' };
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      fullName: user.fullName,
      position: user.position,
    };
    return this.jwtService.sign(payload);
  }

  private getFrontMenu(roles: UserRole[]) {
    return this.filterMenuByRoles(structuredClone(FRONTEND_MENU), roles);
  }

  private filterMenuByRoles(menu: Menu[], userRoles: UserRole[]): Menu[] {
    return menu
      .map((item) => {
        if (item.items) {
          const filteredChildren = this.filterMenuByRoles(item.items, userRoles);
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
          return null;
        }

        // Si no tiene rol asignado, mostrarlo a todos
        if (!item.role) {
          return item;
        }

        // Si tiene rol, verificar si alguno de los roles del usuario lo permite
        if (userRoles.includes(item.role)) {
          return item;
        }

        return null;
      })
      .filter(Boolean); // eliminar elementos nulos
  }

  private async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}
