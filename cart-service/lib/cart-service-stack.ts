import * as cdk from 'aws-cdk-lib';
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';
import { join } from 'path';

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
      }
    );
  }
}
