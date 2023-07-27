import { RestExceptionHandler } from './adapters/exception-handler/exception-handler.service';
import { RestRequestHandler } from './adapters/request-handler/request-handler.service';
import { HealthCheckService, SystemController } from './health-check';
import { UserController } from './user/user.controller';

const constrollers = [SystemController, UserController];
const providers = [RestRequestHandler, RestExceptionHandler, HealthCheckService];

export const rest = {
  constrollers,
  providers,
};
