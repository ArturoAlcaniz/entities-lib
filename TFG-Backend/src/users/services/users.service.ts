import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'
import { CustomHashing } from '../../hashing/hashing.service';
import { BaseService } from '../../commons/service.commons';
import { FindOneOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService extends BaseService<User> {

    usersLoggedIn: Map<string, string> =  new Map<string, string>();

    constructor(private hashService: CustomHashing, @InjectRepository(User) private userRepository : Repository<User>){
        super();
    }

    getRepository(): Repository<User> {
        return this.userRepository;
    }

    findOne(options: FindOneOptions<User>): Promise<User> {
        return this.getRepository().findOne(options);
    }

    createUser(email: string, name: string, pass: string): User{
        let user: User = new User();
        user.EMAIL = email;
        user.USERNAME = name;
        user.PASSWORD = this.hashService.stringToHash(pass);
        return user;
    }

    verifyPass(user: User, pass: string){
        return this.hashService.checkHash(pass, user.PASSWORD);
    }

    async validateUniqueEmail(user: User){
        if ((await this.findOne({ where: { EMAIL: user.EMAIL}})) != null) {
            return false;
        }
        return true;
    }

    async validateUniqueUsername(user: User){
        if ((await this.findOne({ where: { USERNAME: user.USERNAME}})) != null) {
            return false;
        }
        return true;
    }

}
