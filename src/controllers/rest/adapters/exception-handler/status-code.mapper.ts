import { EXCEPTION_CODE } from '@/core/domain/exception/exception-code.enum';
import { HttpStatus } from '@nestjs/common';

export const mappedExceptionCodes = new Map<EXCEPTION_CODE, HttpStatus>();

mappedExceptionCodes.set(EXCEPTION_CODE.INVALID_INPUT, HttpStatus.BAD_REQUEST);
mappedExceptionCodes.set(EXCEPTION_CODE.DATABASE, HttpStatus.BAD_REQUEST);
mappedExceptionCodes.set(EXCEPTION_CODE.UNKNOWN, HttpStatus.INTERNAL_SERVER_ERROR);
