import * as cdk from 'aws-cdk-lib';
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
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

    
  }
}
