/* @flow */
import Router from 'koa-router'

export class HttpMethod {
  static HEAD = 'HEAD';
  static OPTIONS = 'OPTIONS';
  static GET = 'GET';
  static PUT = 'PUT';
  static PATCH = 'PATCH';
  static POST = 'POST';
  static DELETE = 'DELETE';
}


// decorator factory
export function route(path: string, method : string = HttpMethod.GET) {
  return (target, key, descriptor)  => {

    if(!path) {
      console.error('@route should have at lease one argument: path');
      process.exit(1);
    }

    if(!target.prototype.router) {
      target.prototype.router = new Router();
    }

    if(target && !key && !descriptor) {
      target.prototype.router.prefix(path)
    } else {

      if(!method) {
        console.error('@route on method should have "method" as second argument');
        process.exit(1);
      }
      switch(method) {
        case HttpMethod.HEAD:
          target.prototype.router.head('/', descriptor.value);
          break;
        case HttpMethod.OPTIONS:
          target.prototype.router.options('/', descriptor.value);
          break;
        case HttpMethod.GET:
          target.prototype.router.get('/', descriptor.value);
          break;
        case HttpMethod.PUT:
          target.prototype.router.put('/', descriptor.value);
          break;
        case HttpMethod.PATCH:
          target.prototype.router.patch('/', descriptor.value);
          break;
        case HttpMethod.POST:
          target.prototype.router.post('/', descriptor.value);
          break;
        case HttpMethod.DELET:
          target.prototype.router.delete('/', descriptor.value);
          break;
        default:
          throw new Error('@route decorator "method" is not valid');
      }

    }

  }
}