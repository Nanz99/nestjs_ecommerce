import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDto } from './roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<RoleDto>,
  ) {}

  async getAll(): Promise<RoleDto[]> {
    const role = await this.roleModel.find({});
    return role;
  }

  async create(role) {
    const _role = new this.roleModel(role);
    return await _role.save();
  }

  async getById(id): Promise<RoleDto> {
    const role = await this.roleModel.findOne(id);
    if (!role) {
      throw new HttpException('Role not found', 404);
    }
    return role;
  }

  async update(id, role): Promise<any> {
    const updateRole = await this.roleModel.findById(id);
    if (!updateRole) {
      throw new HttpException('Role not found', 404);
    }
    return {
      message: 'Role has been updated',
      role: this.roleModel.findByIdAndUpdate(id, role, { new: true }),
    };
  }

  async delete(id): Promise<any> {
    const deleRole = await this.roleModel.findById(id);
    if (!deleRole) {
      throw new HttpException('Product not found', 404);
    }
    return {
      message: 'Role has been updated',
      role: this.roleModel.findByIdAndRemove(id),
    };
  }
}
