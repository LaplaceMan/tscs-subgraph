import { BigInt } from "@graphprotocol/graph-ts"
import {
  SubtitleSystem,
  ApplicationCancel,
  ApplicationRecover,
  ApplicationSubmit,
  OpeatorsStateChange,
  OwnershipTransferred,
  PlatformJoin,
  PlatformSetRate,
  RegisterLanguage,
  SubitlteGetEvaluation,
  SubtilteStateChange,
  SubtitleCountsUpdate,
  SystemSetAccess,
  SystemSetAudit,
  SystemSetDetection,
  SystemSetLockUpTime,
  SystemSetSettlement,
  SystemSetSubtitleToken,
  SystemSetVideoToken,
  SystemSetZimuToken,
  UserInfoUpdate,
  UserJoin,
  UserLockRewardUpdate,
  UserWithdraw,
  VideoCountsUpdate,
  VideoCreate,
  VideoPreExtract
} from "../generated/SubtitleSystem/SubtitleSystem"
import { ExampleEntity } from "../generated/schema"

export function handleApplicationCancel(event: ApplicationCancel): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.applyId = event.params.applyId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.Despoit(...)
  // - contract.accessStrategy(...)
  // - contract.auditStrategy(...)
  // - contract.createVideo(...)
  // - contract.detectionStrategy(...)
  // - contract.getDefaultVideoSrc(...)
  // - contract.getLanguageId(...)
  // - contract.getSubtitleAuditInfo(...)
  // - contract.getUserBaseInfo(...)
  // - contract.getUserLockReward(...)
  // - contract.getVideoApplys(...)
  // - contract.languageTypes(...)
  // - contract.lockUpTime(...)
  // - contract.owner(...)
  // - contract.penalty(...)
  // - contract.platformRate(...)
  // - contract.platforms(...)
  // - contract.platfromJoin(...)
  // - contract.preExtractOther(...)
  // - contract.registerLanguage(...)
  // - contract.settlementStrategy(...)
  // - contract.submitApplication(...)
  // - contract.subtitleNFT(...)
  // - contract.subtitleToken(...)
  // - contract.totalApplyNumber(...)
  // - contract.totalApplys(...)
  // - contract.totalPlatforms(...)
  // - contract.totalVideoNumber(...)
  // - contract.uploadSubtitle(...)
  // - contract.videoToken(...)
  // - contract.videos(...)
  // - contract.withdraw(...)
  // - contract.withdrawDeposit(...)
  // - contract.zimuToken(...)
}

export function handleApplicationRecover(event: ApplicationRecover): void {}

export function handleApplicationSubmit(event: ApplicationSubmit): void {}

export function handleOpeatorsStateChange(event: OpeatorsStateChange): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePlatformJoin(event: PlatformJoin): void {}

export function handlePlatformSetRate(event: PlatformSetRate): void {}

export function handleRegisterLanguage(event: RegisterLanguage): void {}

export function handleSubitlteGetEvaluation(
  event: SubitlteGetEvaluation
): void {}

export function handleSubtilteStateChange(event: SubtilteStateChange): void {}

export function handleSubtitleCountsUpdate(event: SubtitleCountsUpdate): void {}

export function handleSystemSetAccess(event: SystemSetAccess): void {}

export function handleSystemSetAudit(event: SystemSetAudit): void {}

export function handleSystemSetDetection(event: SystemSetDetection): void {}

export function handleSystemSetLockUpTime(event: SystemSetLockUpTime): void {}

export function handleSystemSetSettlement(event: SystemSetSettlement): void {}

export function handleSystemSetSubtitleToken(
  event: SystemSetSubtitleToken
): void {}

export function handleSystemSetVideoToken(event: SystemSetVideoToken): void {}

export function handleSystemSetZimuToken(event: SystemSetZimuToken): void {}

export function handleUserInfoUpdate(event: UserInfoUpdate): void {}

export function handleUserJoin(event: UserJoin): void {}

export function handleUserLockRewardUpdate(event: UserLockRewardUpdate): void {}

export function handleUserWithdraw(event: UserWithdraw): void {}

export function handleVideoCountsUpdate(event: VideoCountsUpdate): void {}

export function handleVideoCreate(event: VideoCreate): void {}

export function handleVideoPreExtract(event: VideoPreExtract): void {}
