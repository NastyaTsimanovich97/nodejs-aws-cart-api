import * as cdk from 'aws-cdk-lib';
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { Construct } from 'constructs';

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartHandler = new LambdaFunction(
      this,
      'TsimanovichCartService',
      {
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset('../dist'),
        handler: 'main.handler',
        environment: {
          POSTGRES_DB: process.env.POSTGRES_DB!,
          POSTGRES_USER: process.env.POSTGRES_USER!,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
          POSTGRES_HOST: process.env.POSTGRES_HOST!,
          POSTGRES_PORT: process.env.POSTGRES_PORT!,
        }
      }
    );

    const cartIntegration = new apigateway.LambdaIntegration(cartHandler, {
      requestTemplates: { 'application/json': "{ 'statusCode': '200' }" },
    });

    const restApi = new apigateway.RestApi(this, 'Cart API', {
      restApiName: 'Cart',
      defaultCorsPreflightOptions: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      defaultIntegration: cartIntegration,
    });

    const ping = restApi.root.addResource('ping');
    ping.addMethod('GET');

    const api = restApi.root.addResource('api');

    const profile = api.addResource('profile');
    profile.addMethod('GET');

    const cart = profile.addResource('cart');
    cart.addMethod('GET');
    cart.addMethod('PUT');
    cart.addMethod('DELETE');

    const checkout = cart.addResource('checkout');
    checkout.addMethod('POST');
  }
}
