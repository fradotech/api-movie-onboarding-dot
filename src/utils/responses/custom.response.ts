import { Pagination } from 'nestjs-typeorm-paginate';

export interface ApiResponse<T> {
  statusCode: number,
  success: boolean;
  message: string;
  data: T | Pagination<T>;
}

export class CustomResponse {
  static async success<T>(statusCode: number, data: T | Pagination<T>, message: string): Promise<ApiResponse<T>> {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static async error<T>(statusCode: number, data: T | Pagination<T>, message: string): Promise<ApiResponse<T>> {
    return {
      success: false,
      statusCode,
      message,
      data,
    };
  }
}