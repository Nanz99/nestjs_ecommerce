import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SizeSchema } from 'src/models/size.schema';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Size', schema: SizeSchema }])],
  controllers: [SizesController],

  providers: [SizesService],
})
export class SizesModule {}
