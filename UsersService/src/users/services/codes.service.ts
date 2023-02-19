import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Code } from "$/../../../entities-lib/src/entities/code.entity";
import { Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { CreateCodeTokenDto } from "../dtos/createCodeToken.dto";
import { Logger } from "winston";

@Injectable()
export class CodesService extends BaseService<Code> {

    constructor(
        @InjectRepository(Code) private userRepository: Repository<Code>,
        @Inject("winston") private readonly logger: Logger
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
        if((payload.starts == null || payload.starts.length == 0)) {
            code.STARTS = new Date().toISOString();
        } else {
            code.STARTS = payload.starts;
        }
        code.ENDS = payload.ends;
        code.AMOUNT = Number(payload.amount);
        this.logger.info("Created code: {CODE}".replace("{CODE}", code.toString()));        
        return code;
    }
}