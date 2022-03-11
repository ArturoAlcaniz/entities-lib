import { JwtModule } from '@nestjs/jwt';

import { Module } from "@nestjs/common";

@Module({
    imports: [
        JwtModule.register({
            secret: 'crQKmo6Uqw',
            signOptions: {expiresIn: '30m'}
        }),
    ],
    exports: [ JwtModule ]
})

export class ConfigJwtModule {}