import {IsString, IsNumber } from 'class-validator';

export class addProduct {
  @IsString()
  name: string
  
  @IsString()
  description: string

  @IsNumber()
  price: string

  @IsNumber()
  quantity: string
}