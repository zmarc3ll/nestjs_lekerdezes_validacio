import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { DataSource, EntityNotFoundError } from 'typeorm';
import Alkalmazott from './alkalmazott.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('alkalmazott/search')
  async searchAlkalmazott(@Query('email') email: string){
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    const [adat, darab] = await
    alkalmazottRepo.createQueryBuilder().where('hivatalosEmail LIKE :email', {email: '%' + email+ '%' }).getManyAndCount();
   return await alkalmazottRepo.findOneByOrFail({hivatalosEmail: email});
  }

  @Get('/alkalmazott/:id')
  async getAlkalmazott(@Param('id') id: number) {
    try{
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo.findOneByOrFail({id: id});
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      throw new NotFoundException('Az alkalmazott  nem létezik');
    } else {
      throw e;
    }
  }
}


}
