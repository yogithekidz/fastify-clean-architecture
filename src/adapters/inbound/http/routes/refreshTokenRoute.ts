import { RouteGenericInterface } from 'fastify';
import { RefreshTokenRequestDto } from '@domain/model/request/tokenRequestDto';

export interface RefreshTokenRoute extends RouteGenericInterface {
  Body: RefreshTokenRequestDto;
}
