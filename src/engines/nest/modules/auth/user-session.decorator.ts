import { Session } from '@/core/domain/class/session/session.class';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IncomingMessage } from 'http';

enum CONTEXT_ARGS {
  ROOT,
  ARGS,
  CTX,
  INFO,
}

export function isHttpExecutionContext(context: ExecutionContext | any[]): context is ExecutionContext {
  return !(context as any[]).length;
}

export const UserSession = createParamDecorator((data: unknown, context: ExecutionContext | any[]): Session => {
  if (isHttpExecutionContext(context)) {
    const args = context.getArgs();
    const request = args.find((arg) => arg instanceof IncomingMessage);
    if (!request) throw new Error('request not found');
    return request.session;
  }

  const ctx = context[CONTEXT_ARGS.CTX];
  return ctx.req.user;
});
