import { HttpStatus } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | Pagination<T>;
}

export class CustomResponse {
  static async success<T>(
    message: string,
    data: T | Pagination<T>,
  ): Promise<IApiResponse<T>> {
    return {
      success: true,
      message: message,
      data: data,
    };
  }

  static async error<T>(
    data: T | Pagination<T>,
    message: string,
  ): Promise<IApiResponse<T>> {
    return {
      success: false,
      message: message,
      data: data,
    };
  }
}