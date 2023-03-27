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

export class BoxCreated extends ethereum.Event {
  get params(): BoxCreated__Params {
    return new BoxCreated__Params(this);
  }
}

export class BoxCreated__Params {
  _event: BoxCreated;

  constructor(event: BoxCreated) {
    this._event = event;
  }

  get realId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get platform(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get boxId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class BoxRevenueUpdate extends ethereum.Event {
  get params(): BoxRevenueUpdate__Params {
    return new BoxRevenueUpdate__Params(this);
  }
}

export class BoxRevenueUpdate__Params {
  _event: BoxRevenueUpdate;

  constructor(event: BoxRevenueUpdate) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get amounts(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get caller(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ExtractRevenue extends ethereum.Event {
  get params(): ExtractRevenue__Params {
    return new ExtractRevenue__Params(this);
  }
}

export class ExtractRevenue__Params {
  _event: ExtractRevenue;

  constructor(event: ExtractRevenue) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get caller(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ExtractRevenuePre extends ethereum.Event {
  get params(): ExtractRevenuePre__Params {
    return new ExtractRevenuePre__Params(this);
  }
}

export class ExtractRevenuePre__Params {
  _event: ExtractRevenuePre;

  constructor(event: ExtractRevenuePre) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get caller(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ItemAudited extends ethereum.Event {
  get params(): ItemAudited__Params {
    return new ItemAudited__Params(this);
  }
}

export class ItemAudited__Params {
  _event: ItemAudited;

  constructor(event: ItemAudited) {
    this._event = event;
  }

  get itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get attitude(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get auditor(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ItemRevenueUpdate extends ethereum.Event {
  get params(): ItemRevenueUpdate__Params {
    return new ItemRevenueUpdate__Params(this);
  }
}

export class ItemRevenueUpdate__Params {
  _event: ItemRevenueUpdate;

  constructor(event: ItemRevenueUpdate) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get counts(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ItemStateUpdate extends ethereum.Event {
  get params(): ItemStateUpdate__Params {
    return new ItemStateUpdate__Params(this);
  }
}

export class ItemStateUpdate__Params {
  _event: ItemStateUpdate;

  constructor(event: ItemStateUpdate) {
    this._event = event;
  }

  get itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get state(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class ItemSubmitted extends ethereum.Event {
  get params(): ItemSubmitted__Params {
    return new ItemSubmitted__Params(this);
  }
}

export class ItemSubmitted__Params {
  _event: ItemSubmitted;

  constructor(event: ItemSubmitted) {
    this._event = event;
  }

  get vars(): ItemSubmittedVarsStruct {
    return changetype<ItemSubmittedVarsStruct>(
      this._event.parameters[0].value.toTuple()
    );
  }

  get itemId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get maker(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ItemSubmittedVarsStruct extends ethereum.Tuple {
  get taskId(): BigInt {
    return this[0].toBigInt();
  }

  get cid(): string {
    return this[1].toString();
  }

  get requireId(): BigInt {
    return this[2].toBigInt();
  }

  get fingerprint(): BigInt {
    return this[3].toBigInt();
  }
}

export class ItemVersionReportInvaild extends ethereum.Event {
  get params(): ItemVersionReportInvaild__Params {
    return new ItemVersionReportInvaild__Params(this);
  }
}

export class ItemVersionReportInvaild__Params {
  _event: ItemVersionReportInvaild;

  constructor(event: ItemVersionReportInvaild) {
    this._event = event;
  }

  get itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get versionId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ItemVersionUpdate extends ethereum.Event {
  get params(): ItemVersionUpdate__Params {
    return new ItemVersionUpdate__Params(this);
  }
}

export class ItemVersionUpdate__Params {
  _event: ItemVersionUpdate;

  constructor(event: ItemVersionUpdate) {
    this._event = event;
  }

  get itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get fingerprint(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get source(): string {
    return this._event.parameters[2].value.toString();
  }

  get versionId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class MurmesSetAuditModuleIsWhitelisted extends ethereum.Event {
  get params(): MurmesSetAuditModuleIsWhitelisted__Params {
    return new MurmesSetAuditModuleIsWhitelisted__Params(this);
  }
}

export class MurmesSetAuditModuleIsWhitelisted__Params {
  _event: MurmesSetAuditModuleIsWhitelisted;

  constructor(event: MurmesSetAuditModuleIsWhitelisted) {
    this._event = event;
  }

  get module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get result(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class MurmesSetAuthorityModuleIsWhitelisted extends ethereum.Event {
  get params(): MurmesSetAuthorityModuleIsWhitelisted__Params {
    return new MurmesSetAuthorityModuleIsWhitelisted__Params(this);
  }
}

export class MurmesSetAuthorityModuleIsWhitelisted__Params {
  _event: MurmesSetAuthorityModuleIsWhitelisted;

  constructor(event: MurmesSetAuthorityModuleIsWhitelisted) {
    this._event = event;
  }

  get module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get result(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class MurmesSetComponent extends ethereum.Event {
  get params(): MurmesSetComponent__Params {
    return new MurmesSetComponent__Params(this);
  }
}

export class MurmesSetComponent__Params {
  _event: MurmesSetComponent;

  constructor(event: MurmesSetComponent) {
    this._event = event;
  }

  get id(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get components(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class MurmesSetCurrencyIsWhitelisted extends ethereum.Event {
  get params(): MurmesSetCurrencyIsWhitelisted__Params {
    return new MurmesSetCurrencyIsWhitelisted__Params(this);
  }
}

export class MurmesSetCurrencyIsWhitelisted__Params {
  _event: MurmesSetCurrencyIsWhitelisted;

  constructor(event: MurmesSetCurrencyIsWhitelisted) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get result(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class MurmesSetDetectionModuleIsWhitelisted extends ethereum.Event {
  get params(): MurmesSetDetectionModuleIsWhitelisted__Params {
    return new MurmesSetDetectionModuleIsWhitelisted__Params(this);
  }
}

export class MurmesSetDetectionModuleIsWhitelisted__Params {
  _event: MurmesSetDetectionModuleIsWhitelisted;

  constructor(event: MurmesSetDetectionModuleIsWhitelisted) {
    this._event = event;
  }

  get module(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get result(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class MurmesSetFee extends ethereum.Event {
  get params(): MurmesSetFee__Params {
    return new MurmesSetFee__Params(this);
  }
}

export class MurmesSetFee__Params {
  _event: MurmesSetFee;

  constructor(event: MurmesSetFee) {
    this._event = event;
  }

  get oldFee(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get newFee(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class MurmesSetGuardModuleIsWhitelisted extends ethereum.Event {
  get params(): MurmesSetGuardModuleIsWhitelisted__Params {
    return new MurmesSetGuardModuleIsWhitelisted__Params(this);
  }
}

export class MurmesSetGuardModuleIsWhitelisted__Params {
  _event: MurmesSetGuardModuleIsWhitelisted;

  constructor(event: MurmesSetGuardModuleIsWhitelisted) {
    this._event = event;
  }

  get guard(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get result(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class MurmesSetLockUpTime extends ethereum.Event {
  get params(): MurmesSetLockUpTime__Params {
    return new MurmesSetLockUpTime__Params(this);
  }
}

export class MurmesSetLockUpTime__Params {
  _event: MurmesSetLockUpTime;

  constructor(event: MurmesSetLockUpTime) {
    this._event = event;
  }

  get oldTime(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class MurmesSetSettlementModule extends ethereum.Event {
  get params(): MurmesSetSettlementModule__Params {
    return new MurmesSetSettlementModule__Params(this);
  }
}

export class MurmesSetSettlementModule__Params {
  _event: MurmesSetSettlementModule;

  constructor(event: MurmesSetSettlementModule) {
    this._event = event;
  }

  get moduleId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get module(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OperatorStateUpdate extends ethereum.Event {
  get params(): OperatorStateUpdate__Params {
    return new OperatorStateUpdate__Params(this);
  }
}

export class OperatorStateUpdate__Params {
  _event: OperatorStateUpdate;

  constructor(event: OperatorStateUpdate) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get state(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class PenaltyTransferred extends ethereum.Event {
  get params(): PenaltyTransferred__Params {
    return new PenaltyTransferred__Params(this);
  }
}

export class PenaltyTransferred__Params {
  _event: PenaltyTransferred;

  constructor(event: PenaltyTransferred) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PlatformStateUpdate extends ethereum.Event {
  get params(): PlatformStateUpdate__Params {
    return new PlatformStateUpdate__Params(this);
  }
}

export class PlatformStateUpdate__Params {
  _event: PlatformStateUpdate;

  constructor(event: PlatformStateUpdate) {
    this._event = event;
  }

  get platform(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rate1(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get rate2(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

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

  get platformId(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class RegisterRepuire extends ethereum.Event {
  get params(): RegisterRepuire__Params {
    return new RegisterRepuire__Params(this);
  }
}

export class RegisterRepuire__Params {
  _event: RegisterRepuire;

  constructor(event: RegisterRepuire) {
    this._event = event;
  }

  get require(): string {
    return this._event.parameters[0].value.toString();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ReportPosted extends ethereum.Event {
  get params(): ReportPosted__Params {
    return new ReportPosted__Params(this);
  }
}

export class ReportPosted__Params {
  _event: ReportPosted;

  constructor(event: ReportPosted) {
    this._event = event;
  }

  get reason(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get itemId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get proofSubtitleId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get otherProof(): string {
    return this._event.parameters[3].value.toString();
  }

  get reporter(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class ReportResult extends ethereum.Event {
  get params(): ReportResult__Params {
    return new ReportResult__Params(this);
  }
}

export class ReportResult__Params {
  _event: ReportResult;

  constructor(event: ReportResult) {
    this._event = event;
  }

  get reportId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get resultProof(): string {
    return this._event.parameters[1].value.toString();
  }

  get result(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class TaskCancelled extends ethereum.Event {
  get params(): TaskCancelled__Params {
    return new TaskCancelled__Params(this);
  }
}

export class TaskCancelled__Params {
  _event: TaskCancelled;

  constructor(event: TaskCancelled) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class TaskPosted extends ethereum.Event {
  get params(): TaskPosted__Params {
    return new TaskPosted__Params(this);
  }
}

export class TaskPosted__Params {
  _event: TaskPosted;

  constructor(event: TaskPosted) {
    this._event = event;
  }

  get vars(): TaskPostedVarsStruct {
    return changetype<TaskPostedVarsStruct>(
      this._event.parameters[0].value.toTuple()
    );
  }

  get taskId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get caller(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class TaskPostedVarsStruct extends ethereum.Tuple {
  get platform(): Address {
    return this[0].toAddress();
  }

  get sourceId(): BigInt {
    return this[1].toBigInt();
  }

  get requireId(): BigInt {
    return this[2].toBigInt();
  }

  get source(): string {
    return this[3].toString();
  }

  get settlement(): i32 {
    return this[4].toI32();
  }

  get amount(): BigInt {
    return this[5].toBigInt();
  }

  get currency(): Address {
    return this[6].toAddress();
  }

  get auditModule(): Address {
    return this[7].toAddress();
  }

  get detectionModule(): Address {
    return this[8].toAddress();
  }

  get deadline(): BigInt {
    return this[9].toBigInt();
  }
}

export class TaskReset extends ethereum.Event {
  get params(): TaskReset__Params {
    return new TaskReset__Params(this);
  }
}

export class TaskReset__Params {
  _event: TaskReset;

  constructor(event: TaskReset) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TaskStateUpdate extends ethereum.Event {
  get params(): TaskStateUpdate__Params {
    return new TaskStateUpdate__Params(this);
  }
}

export class TaskStateUpdate__Params {
  _event: TaskStateUpdate;

  constructor(event: TaskStateUpdate) {
    this._event = event;
  }

  get taskId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get plusAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get plusTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UserBaseDataUpdate extends ethereum.Event {
  get params(): UserBaseDataUpdate__Params {
    return new UserBaseDataUpdate__Params(this);
  }
}

export class UserBaseDataUpdate__Params {
  _event: UserBaseDataUpdate;

  constructor(event: UserBaseDataUpdate) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get reputationSpread(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenSpread(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UserGuardUpdate extends ethereum.Event {
  get params(): UserGuardUpdate__Params {
    return new UserGuardUpdate__Params(this);
  }
}

export class UserGuardUpdate__Params {
  _event: UserGuardUpdate;

  constructor(event: UserGuardUpdate) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get guard(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UserJoin extends ethereum.Event {
  get params(): UserJoin__Params {
    return new UserJoin__Params(this);
  }
}

export class UserJoin__Params {
  _event: UserJoin;

  constructor(event: UserJoin) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get reputation(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UserLockedRevenueUpdate extends ethereum.Event {
  get params(): UserLockedRevenueUpdate__Params {
    return new UserLockedRevenueUpdate__Params(this);
  }
}

export class UserLockedRevenueUpdate__Params {
  _event: UserLockedRevenueUpdate;

  constructor(event: UserLockedRevenueUpdate) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get platform(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get day(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get revenue(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class UserWithdrawDeposit extends ethereum.Event {
  get params(): UserWithdrawDeposit__Params {
    return new UserWithdrawDeposit__Params(this);
  }
}

export class UserWithdrawDeposit__Params {
  _event: UserWithdrawDeposit;

  constructor(event: UserWithdrawDeposit) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class UserWithdrawRevenue extends ethereum.Event {
  get params(): UserWithdrawRevenue__Params {
    return new UserWithdrawRevenue__Params(this);
  }
}

export class UserWithdrawRevenue__Params {
  _event: UserWithdrawRevenue;

  constructor(event: UserWithdrawRevenue) {
    this._event = event;
  }

  get platform(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get day(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }

  get all(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get caller(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class Events extends ethereum.SmartContract {
  static bind(address: Address): Events {
    return new Events("Events", address);
  }
}