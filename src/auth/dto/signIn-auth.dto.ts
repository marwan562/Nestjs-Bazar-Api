import { OmitType } from '@nestjs/mapped-types';
import { SignUpDTO } from './signup-auth.dto';

export class SignInDTO extends OmitType(SignUpDTO, ["name"]) {}
