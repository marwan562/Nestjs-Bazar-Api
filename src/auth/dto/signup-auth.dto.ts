import {
  IsEmail,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class SignUpDTO {
  @Length(0, 10)
  @IsString({ message: 'Name Should be String' })
  name: string;

  @IsEmail()
  email: string;

  @Length(0, 10)
  password: string;
}
