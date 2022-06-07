import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/users.dto';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDto>,
    private jwtService: JwtService,
  ) {}

  async login(input): Promise<any> {
    const { email, password } = input;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    //check password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    //  const token = await APIFeatures.assignJwtToken(user._id, this.jwtService);
    const token = await this.jwtService.sign({ id: user._id });
    return {
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
      token,
    };
  }

  async register(input) {
    const { name, email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return user;
    } catch (err) {
      console.log(err);
      //Handle duplicates email
      if (err.code === 11000) {
        throw new ConflictException('Duplicate email');
      }
    }
  }
}
