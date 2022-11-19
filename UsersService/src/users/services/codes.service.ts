import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Code } from "$/../../../entities-lib/src/entities/code.entity";
import { Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { CreateCodeTokenDto } from "../dtos/createCodeToken.dto";

@Injectable()
export class CodesService extends BaseService<Code> {

    constructor(
        @InjectRepository(Code) private userRepository: Repository<Code>
    ) {
        super();
    }

    getRepository(): Repository<Code> {
        return this.userRepository;
    }

    createCode(payload: CreateCodeTokenDto): Code {
        let code: Code = new Code();
        code.ID = payload.id;
        code.COINS = Number(payload.coins);
        code.STARTS = payload.starts;
        code.ENDS = payload.ends;
        code.AMOUNT = Number(payload.amount);
        return code;
    }
}