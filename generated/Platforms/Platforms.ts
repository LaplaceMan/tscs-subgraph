// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class RegisterPlatform extends ethereum.Event {
  get params(): RegisterPlatform__Params {
    return new RegisterPlatform__Params(this);
  }
}

export class RegisterPlatform__Params {
  _event: RegisterPlatform;

  constructor(event: RegisterPlatform) {
    this._event = event;
  }

  get platform(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[2].value.toString();
  }

  get rate1(): i32 {
    return this._event.parameters[3].value.toI32();
  }

  get rate2(): i32 {
    return this._event.parameters[4].value.toI32();
  }

  get authority(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class Platforms__getBoxResultValue0Struct extends ethereum.Tuple {
  get platform(): Address {
    return this[0].toAddress();
  }

  get id(): BigInt {
    return this[1].toBigInt();
  }

  get creator(): Address {
    return this[2].toAddress();
  }

  get unsettled(): BigInt {
    return this[3].toBigInt();
  }

  get tasks(): Array<BigInt> {
    return this[4].toBigIntArray();
  }
}

export class Platforms__getPlatformResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get symbol(): string {
    return this[1].toString();
  }

  get platformId(): BigInt {
    return this[2].toBigInt();
  }

  get rateCountsToProfit(): i32 {
    return this[3].toI32();
  }

  get rateAuditorDivide(): i32 {
    return this[4].toI32();
  }

  get authorityModule(): Address {
    return this[5].toAddress();
  }
}

export class Platforms__getPlatformRateResult {
  value0: i32;
  value1: i32;

  constructor(value0: i32, value1: i32) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    return map;
  }

  getValue0(): i32 {
    return this.value0;
  }

  getValue1(): i32 {
    return this.value1;
  }
}

export class Platforms extends ethereum.SmartContract {
  static bind(address: Address): Platforms {
    return new Platforms("Platforms", address);
  }

  Murmes(): Address {
    let result = super.call("Murmes", "Murmes():(address)", []);

    return result[0].toAddress();
  }

  try_Murmes(): ethereum.CallResult<Address> {
    let result = super.tryCall("Murmes", "Murmes():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  addPlatform(
    platform: Address,
    name: string,
    symbol: string,
    rate1: i32,
    rate2: i32,
    authority: Address
  ): BigInt {
    let result = super.call(
      "addPlatform",
      "addPlatform(address,string,string,uint16,uint16,address):(uint256)",
      [
        ethereum.Value.fromAddress(platform),
        ethereum.Value.fromString(name),
        ethereum.Value.fromString(symbol),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate2)),
        ethereum.Value.fromAddress(authority)
      ]
    );

    return result[0].toBigInt();
  }

  try_addPlatform(
    platform: Address,
    name: string,
    symbol: string,
    rate1: i32,
    rate2: i32,
    authority: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addPlatform",
      "addPlatform(address,string,string,uint16,uint16,address):(uint256)",
      [
        ethereum.Value.fromAddress(platform),
        ethereum.Value.fromString(name),
        ethereum.Value.fromString(symbol),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate2)),
        ethereum.Value.fromAddress(authority)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  createBox(realId: BigInt, platform: Address, creator: Address): BigInt {
    let result = super.call(
      "createBox",
      "createBox(uint256,address,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(realId),
        ethereum.Value.fromAddress(platform),
        ethereum.Value.fromAddress(creator)
      ]
    );

    return result[0].toBigInt();
  }

  try_createBox(
    realId: BigInt,
    platform: Address,
    creator: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "createBox",
      "createBox(uint256,address,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(realId),
        ethereum.Value.fromAddress(platform),
        ethereum.Value.fromAddress(creator)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBox(boxId: BigInt): Platforms__getBoxResultValue0Struct {
    let result = super.call(
      "getBox",
      "getBox(uint256):((address,uint256,address,uint256,uint256[]))",
      [ethereum.Value.fromUnsignedBigInt(boxId)]
    );

    return changetype<Platforms__getBoxResultValue0Struct>(result[0].toTuple());
  }

  try_getBox(
    boxId: BigInt
  ): ethereum.CallResult<Platforms__getBoxResultValue0Struct> {
    let result = super.tryCall(
      "getBox",
      "getBox(uint256):((address,uint256,address,uint256,uint256[]))",
      [ethereum.Value.fromUnsignedBigInt(boxId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Platforms__getBoxResultValue0Struct>(value[0].toTuple())
    );
  }

  getBoxOrderIdByRealId(platfrom: Address, realId: BigInt): BigInt {
    let result = super.call(
      "getBoxOrderIdByRealId",
      "getBoxOrderIdByRealId(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(platfrom),
        ethereum.Value.fromUnsignedBigInt(realId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getBoxOrderIdByRealId(
    platfrom: Address,
    realId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getBoxOrderIdByRealId",
      "getBoxOrderIdByRealId(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(platfrom),
        ethereum.Value.fromUnsignedBigInt(realId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBoxTasks(boxId: BigInt): Array<BigInt> {
    let result = super.call("getBoxTasks", "getBoxTasks(uint256):(uint256[])", [
      ethereum.Value.fromUnsignedBigInt(boxId)
    ]);

    return result[0].toBigIntArray();
  }

  try_getBoxTasks(boxId: BigInt): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getBoxTasks",
      "getBoxTasks(uint256):(uint256[])",
      [ethereum.Value.fromUnsignedBigInt(boxId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getPlatform(platform: Address): Platforms__getPlatformResultValue0Struct {
    let result = super.call(
      "getPlatform",
      "getPlatform(address):((string,string,uint256,uint16,uint16,address))",
      [ethereum.Value.fromAddress(platform)]
    );

    return changetype<Platforms__getPlatformResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getPlatform(
    platform: Address
  ): ethereum.CallResult<Platforms__getPlatformResultValue0Struct> {
    let result = super.tryCall(
      "getPlatform",
      "getPlatform(address):((string,string,uint256,uint16,uint16,address))",
      [ethereum.Value.fromAddress(platform)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Platforms__getPlatformResultValue0Struct>(value[0].toTuple())
    );
  }

  getPlatformAuthorityModule(platform: Address): Address {
    let result = super.call(
      "getPlatformAuthorityModule",
      "getPlatformAuthorityModule(address):(address)",
      [ethereum.Value.fromAddress(platform)]
    );

    return result[0].toAddress();
  }

  try_getPlatformAuthorityModule(
    platform: Address
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getPlatformAuthorityModule",
      "getPlatformAuthorityModule(address):(address)",
      [ethereum.Value.fromAddress(platform)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPlatformIdByAddress(platform: Address): BigInt {
    let result = super.call(
      "getPlatformIdByAddress",
      "getPlatformIdByAddress(address):(uint256)",
      [ethereum.Value.fromAddress(platform)]
    );

    return result[0].toBigInt();
  }

  try_getPlatformIdByAddress(platform: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPlatformIdByAddress",
      "getPlatformIdByAddress(address):(uint256)",
      [ethereum.Value.fromAddress(platform)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPlatformRate(platform: Address): Platforms__getPlatformRateResult {
    let result = super.call(
      "getPlatformRate",
      "getPlatformRate(address):(uint16,uint16)",
      [ethereum.Value.fromAddress(platform)]
    );

    return new Platforms__getPlatformRateResult(
      result[0].toI32(),
      result[1].toI32()
    );
  }

  try_getPlatformRate(
    platform: Address
  ): ethereum.CallResult<Platforms__getPlatformRateResult> {
    let result = super.tryCall(
      "getPlatformRate",
      "getPlatformRate(address):(uint16,uint16)",
      [ethereum.Value.fromAddress(platform)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Platforms__getPlatformRateResult(value[0].toI32(), value[1].toI32())
    );
  }

  totalBoxes(): BigInt {
    let result = super.call("totalBoxes", "totalBoxes():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalBoxes(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalBoxes", "totalBoxes():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalPlatforms(): BigInt {
    let result = super.call("totalPlatforms", "totalPlatforms():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalPlatforms(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalPlatforms",
      "totalPlatforms():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get ms(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddPlatformCall extends ethereum.Call {
  get inputs(): AddPlatformCall__Inputs {
    return new AddPlatformCall__Inputs(this);
  }

  get outputs(): AddPlatformCall__Outputs {
    return new AddPlatformCall__Outputs(this);
  }
}

export class AddPlatformCall__Inputs {
  _call: AddPlatformCall;

  constructor(call: AddPlatformCall) {
    this._call = call;
  }

  get platform(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get name(): string {
    return this._call.inputValues[1].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[2].value.toString();
  }

  get rate1(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get rate2(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get authority(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class AddPlatformCall__Outputs {
  _call: AddPlatformCall;

  constructor(call: AddPlatformCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class CreateBoxCall extends ethereum.Call {
  get inputs(): CreateBoxCall__Inputs {
    return new CreateBoxCall__Inputs(this);
  }

  get outputs(): CreateBoxCall__Outputs {
    return new CreateBoxCall__Outputs(this);
  }
}

export class CreateBoxCall__Inputs {
  _call: CreateBoxCall;

  constructor(call: CreateBoxCall) {
    this._call = call;
  }

  get realId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get platform(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get creator(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class CreateBoxCall__Outputs {
  _call: CreateBoxCall;

  constructor(call: CreateBoxCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetMurmesAuditorDivideRateCall extends ethereum.Call {
  get inputs(): SetMurmesAuditorDivideRateCall__Inputs {
    return new SetMurmesAuditorDivideRateCall__Inputs(this);
  }

  get outputs(): SetMurmesAuditorDivideRateCall__Outputs {
    return new SetMurmesAuditorDivideRateCall__Outputs(this);
  }
}

export class SetMurmesAuditorDivideRateCall__Inputs {
  _call: SetMurmesAuditorDivideRateCall;

  constructor(call: SetMurmesAuditorDivideRateCall) {
    this._call = call;
  }

  get auditorDivide(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class SetMurmesAuditorDivideRateCall__Outputs {
  _call: SetMurmesAuditorDivideRateCall;

  constructor(call: SetMurmesAuditorDivideRateCall) {
    this._call = call;
  }
}

export class SetMurmesAuthorityModuleCall extends ethereum.Call {
  get inputs(): SetMurmesAuthorityModuleCall__Inputs {
    return new SetMurmesAuthorityModuleCall__Inputs(this);
  }

  get outputs(): SetMurmesAuthorityModuleCall__Outputs {
    return new SetMurmesAuthorityModuleCall__Outputs(this);
  }
}

export class SetMurmesAuthorityModuleCall__Inputs {
  _call: SetMurmesAuthorityModuleCall;

  constructor(call: SetMurmesAuthorityModuleCall) {
    this._call = call;
  }

  get newModule(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMurmesAuthorityModuleCall__Outputs {
  _call: SetMurmesAuthorityModuleCall;

  constructor(call: SetMurmesAuthorityModuleCall) {
    this._call = call;
  }
}

export class SetPlatformRateCall extends ethereum.Call {
  get inputs(): SetPlatformRateCall__Inputs {
    return new SetPlatformRateCall__Inputs(this);
  }

  get outputs(): SetPlatformRateCall__Outputs {
    return new SetPlatformRateCall__Outputs(this);
  }
}

export class SetPlatformRateCall__Inputs {
  _call: SetPlatformRateCall;

  constructor(call: SetPlatformRateCall) {
    this._call = call;
  }

  get rate1(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get rate2(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class SetPlatformRateCall__Outputs {
  _call: SetPlatformRateCall;

  constructor(call: SetPlatformRateCall) {
    this._call = call;
  }
}

export class UpdateBoxTasksByMurmesCall extends ethereum.Call {
  get inputs(): UpdateBoxTasksByMurmesCall__Inputs {
    return new UpdateBoxTasksByMurmesCall__Inputs(this);
  }

  get outputs(): UpdateBoxTasksByMurmesCall__Outputs {
    return new UpdateBoxTasksByMurmesCall__Outputs(this);
  }
}

export class UpdateBoxTasksByMurmesCall__Inputs {
  _call: UpdateBoxTasksByMurmesCall;

  constructor(call: UpdateBoxTasksByMurmesCall) {
    this._call = call;
  }

  get boxId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get tasks(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class UpdateBoxTasksByMurmesCall__Outputs {
  _call: UpdateBoxTasksByMurmesCall;

  constructor(call: UpdateBoxTasksByMurmesCall) {
    this._call = call;
  }
}

export class UpdateBoxUnsettledRevenueByMurmesCall extends ethereum.Call {
  get inputs(): UpdateBoxUnsettledRevenueByMurmesCall__Inputs {
    return new UpdateBoxUnsettledRevenueByMurmesCall__Inputs(this);
  }

  get outputs(): UpdateBoxUnsettledRevenueByMurmesCall__Outputs {
    return new UpdateBoxUnsettledRevenueByMurmesCall__Outputs(this);
  }
}

export class UpdateBoxUnsettledRevenueByMurmesCall__Inputs {
  _call: UpdateBoxUnsettledRevenueByMurmesCall;

  constructor(call: UpdateBoxUnsettledRevenueByMurmesCall) {
    this._call = call;
  }

  get boxId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get differ(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateBoxUnsettledRevenueByMurmesCall__Outputs {
  _call: UpdateBoxUnsettledRevenueByMurmesCall;

  constructor(call: UpdateBoxUnsettledRevenueByMurmesCall) {
    this._call = call;
  }
}

export class UpdateBoxesRevenueCall extends ethereum.Call {
  get inputs(): UpdateBoxesRevenueCall__Inputs {
    return new UpdateBoxesRevenueCall__Inputs(this);
  }

  get outputs(): UpdateBoxesRevenueCall__Outputs {
    return new UpdateBoxesRevenueCall__Outputs(this);
  }
}

export class UpdateBoxesRevenueCall__Inputs {
  _call: UpdateBoxesRevenueCall;

  constructor(call: UpdateBoxesRevenueCall) {
    this._call = call;
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class UpdateBoxesRevenueCall__Outputs {
  _call: UpdateBoxesRevenueCall;

  constructor(call: UpdateBoxesRevenueCall) {
    this._call = call;
  }
}
