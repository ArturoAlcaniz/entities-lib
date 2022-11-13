import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { BaseService } from "../../commons/service.commons";
import { Payment } from "$/../../../entities-lib/src/entities/payment.entity";
import { User } from "$/../../../entities-lib/src/entities/user.entity";

@Injectable()
export class PaymentsService extends BaseService<Payment> {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>
    ) {
        super();
    }

    getRepository(): Repository<Payment> {
        return this.paymentRepository;
    }

    findOne(options: FindOneOptions<Payment>): Promise<Payment> {
        return this.getRepository().findOne(options);
    }

    async validatePayment(payment: Payment) {
        if ((await this.findOne({where: {ID: payment.ID}})) != null) {
            return false;
        }
        return true;
    }

    createPayment(id: string, coins: string, user: User): Payment{
        let payment: Payment = new Payment();
        payment.ID = id;
        payment.COINS = parseFloat(coins);
        payment.USER = user;
        return payment;
    }
}