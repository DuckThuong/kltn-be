import { Controller } from '@nestjs/common';
import { LoginService } from 'src/services/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
}
