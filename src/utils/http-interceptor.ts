import "reflect-metadata";
import { injectable } from "inversify";

export interface HttpInterceptor {
  interceptRequest(url: string, options: RequestInit): RequestInit;
  interceptResponse<T>(response: T): T;
}

export interface InterceptorConfig {
  headers?: Record<string, string>;
}

@injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  private config: InterceptorConfig;

  constructor() {
    this.config = {};
  }

  setConfig(config: InterceptorConfig) {
    this.config = { ...this.config, ...config };
  }

  interceptRequest(url: string, options: RequestInit): RequestInit {
    const headers = {
      ...options.headers,
      ...this.config.headers,
    };

    return {
      ...options,
      headers,
    };
  }

  interceptResponse<T>(response: T): T {
    return response;
  }
}
