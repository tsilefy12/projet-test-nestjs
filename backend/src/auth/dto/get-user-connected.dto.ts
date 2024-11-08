import { IsJWT } from "class-validator";

export class GetUserConnectedDto {
    @IsJWT()
    jwtToken: string
}