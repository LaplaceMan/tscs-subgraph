import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
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

export function createApplicationCancelEvent(
  applyId: BigInt
): ApplicationCancel {
  let applicationCancelEvent = changetype<ApplicationCancel>(newMockEvent())

  applicationCancelEvent.parameters = new Array()

  applicationCancelEvent.parameters.push(
    new ethereum.EventParam(
      "applyId",
      ethereum.Value.fromUnsignedBigInt(applyId)
    )
  )

  return applicationCancelEvent
}

export function createApplicationRecoverEvent(
  applyId: BigInt,
  amount: BigInt,
  deadline: BigInt
): ApplicationRecover {
  let applicationRecoverEvent = changetype<ApplicationRecover>(newMockEvent())

  applicationRecoverEvent.parameters = new Array()

  applicationRecoverEvent.parameters.push(
    new ethereum.EventParam(
      "applyId",
      ethereum.Value.fromUnsignedBigInt(applyId)
    )
  )
  applicationRecoverEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  applicationRecoverEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return applicationRecoverEvent
}

export function createApplicationSubmitEvent(
  applicant: Address,
  platform: Address,
  videoId: BigInt,
  strategy: i32,
  amount: BigInt,
  language: i32,
  deadline: BigInt,
  applyId: BigInt,
  src: string
): ApplicationSubmit {
  let applicationSubmitEvent = changetype<ApplicationSubmit>(newMockEvent())

  applicationSubmitEvent.parameters = new Array()

  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam("applicant", ethereum.Value.fromAddress(applicant))
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam(
      "strategy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(strategy))
    )
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam(
      "language",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(language))
    )
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam(
      "applyId",
      ethereum.Value.fromUnsignedBigInt(applyId)
    )
  )
  applicationSubmitEvent.parameters.push(
    new ethereum.EventParam("src", ethereum.Value.fromString(src))
  )

  return applicationSubmitEvent
}

export function createOpeatorsStateChangeEvent(
  opeators: Array<Address>,
  state: boolean
): OpeatorsStateChange {
  let opeatorsStateChangeEvent = changetype<OpeatorsStateChange>(newMockEvent())

  opeatorsStateChangeEvent.parameters = new Array()

  opeatorsStateChangeEvent.parameters.push(
    new ethereum.EventParam(
      "opeators",
      ethereum.Value.fromAddressArray(opeators)
    )
  )
  opeatorsStateChangeEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromBoolean(state))
  )

  return opeatorsStateChangeEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPlatformJoinEvent(
  platform: Address,
  id: BigInt,
  name: string,
  symbol: string,
  rate1: i32,
  rate2: i32
): PlatformJoin {
  let platformJoinEvent = changetype<PlatformJoin>(newMockEvent())

  platformJoinEvent.parameters = new Array()

  platformJoinEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  platformJoinEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  platformJoinEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  platformJoinEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  platformJoinEvent.parameters.push(
    new ethereum.EventParam(
      "rate1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate1))
    )
  )
  platformJoinEvent.parameters.push(
    new ethereum.EventParam(
      "rate2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate2))
    )
  )

  return platformJoinEvent
}

export function createPlatformSetRateEvent(
  platform: Address,
  rate1: i32,
  rate2: i32
): PlatformSetRate {
  let platformSetRateEvent = changetype<PlatformSetRate>(newMockEvent())

  platformSetRateEvent.parameters = new Array()

  platformSetRateEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  platformSetRateEvent.parameters.push(
    new ethereum.EventParam(
      "rate1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate1))
    )
  )
  platformSetRateEvent.parameters.push(
    new ethereum.EventParam(
      "rate2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rate2))
    )
  )

  return platformSetRateEvent
}

export function createRegisterLanguageEvent(
  language: string,
  id: i32
): RegisterLanguage {
  let registerLanguageEvent = changetype<RegisterLanguage>(newMockEvent())

  registerLanguageEvent.parameters = new Array()

  registerLanguageEvent.parameters.push(
    new ethereum.EventParam("language", ethereum.Value.fromString(language))
  )
  registerLanguageEvent.parameters.push(
    new ethereum.EventParam(
      "id",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id))
    )
  )

  return registerLanguageEvent
}

export function createSubitlteGetEvaluationEvent(
  subtitleId: BigInt,
  evaluator: Address,
  attitude: i32
): SubitlteGetEvaluation {
  let subitlteGetEvaluationEvent = changetype<SubitlteGetEvaluation>(
    newMockEvent()
  )

  subitlteGetEvaluationEvent.parameters = new Array()

  subitlteGetEvaluationEvent.parameters.push(
    new ethereum.EventParam(
      "subtitleId",
      ethereum.Value.fromUnsignedBigInt(subtitleId)
    )
  )
  subitlteGetEvaluationEvent.parameters.push(
    new ethereum.EventParam("evaluator", ethereum.Value.fromAddress(evaluator))
  )
  subitlteGetEvaluationEvent.parameters.push(
    new ethereum.EventParam(
      "attitude",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(attitude))
    )
  )

  return subitlteGetEvaluationEvent
}

export function createSubtilteStateChangeEvent(
  subtitleId: BigInt,
  state: i32,
  time: BigInt
): SubtilteStateChange {
  let subtilteStateChangeEvent = changetype<SubtilteStateChange>(newMockEvent())

  subtilteStateChangeEvent.parameters = new Array()

  subtilteStateChangeEvent.parameters.push(
    new ethereum.EventParam(
      "subtitleId",
      ethereum.Value.fromUnsignedBigInt(subtitleId)
    )
  )
  subtilteStateChangeEvent.parameters.push(
    new ethereum.EventParam(
      "state",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(state))
    )
  )
  subtilteStateChangeEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return subtilteStateChangeEvent
}

export function createSubtitleCountsUpdateEvent(
  platform: Address,
  subtitleId: Array<BigInt>,
  counts: Array<BigInt>
): SubtitleCountsUpdate {
  let subtitleCountsUpdateEvent = changetype<SubtitleCountsUpdate>(
    newMockEvent()
  )

  subtitleCountsUpdateEvent.parameters = new Array()

  subtitleCountsUpdateEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  subtitleCountsUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "subtitleId",
      ethereum.Value.fromUnsignedBigIntArray(subtitleId)
    )
  )
  subtitleCountsUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "counts",
      ethereum.Value.fromUnsignedBigIntArray(counts)
    )
  )

  return subtitleCountsUpdateEvent
}

export function createSystemSetAccessEvent(
  newAccess: Address
): SystemSetAccess {
  let systemSetAccessEvent = changetype<SystemSetAccess>(newMockEvent())

  systemSetAccessEvent.parameters = new Array()

  systemSetAccessEvent.parameters.push(
    new ethereum.EventParam("newAccess", ethereum.Value.fromAddress(newAccess))
  )

  return systemSetAccessEvent
}

export function createSystemSetAuditEvent(newAudit: Address): SystemSetAudit {
  let systemSetAuditEvent = changetype<SystemSetAudit>(newMockEvent())

  systemSetAuditEvent.parameters = new Array()

  systemSetAuditEvent.parameters.push(
    new ethereum.EventParam("newAudit", ethereum.Value.fromAddress(newAudit))
  )

  return systemSetAuditEvent
}

export function createSystemSetDetectionEvent(
  newDetection: Address
): SystemSetDetection {
  let systemSetDetectionEvent = changetype<SystemSetDetection>(newMockEvent())

  systemSetDetectionEvent.parameters = new Array()

  systemSetDetectionEvent.parameters.push(
    new ethereum.EventParam(
      "newDetection",
      ethereum.Value.fromAddress(newDetection)
    )
  )

  return systemSetDetectionEvent
}

export function createSystemSetLockUpTimeEvent(
  time: BigInt
): SystemSetLockUpTime {
  let systemSetLockUpTimeEvent = changetype<SystemSetLockUpTime>(newMockEvent())

  systemSetLockUpTimeEvent.parameters = new Array()

  systemSetLockUpTimeEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return systemSetLockUpTimeEvent
}

export function createSystemSetSettlementEvent(
  strategyId: i32,
  strategy: Address,
  notes: string
): SystemSetSettlement {
  let systemSetSettlementEvent = changetype<SystemSetSettlement>(newMockEvent())

  systemSetSettlementEvent.parameters = new Array()

  systemSetSettlementEvent.parameters.push(
    new ethereum.EventParam(
      "strategyId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(strategyId))
    )
  )
  systemSetSettlementEvent.parameters.push(
    new ethereum.EventParam("strategy", ethereum.Value.fromAddress(strategy))
  )
  systemSetSettlementEvent.parameters.push(
    new ethereum.EventParam("notes", ethereum.Value.fromString(notes))
  )

  return systemSetSettlementEvent
}

export function createSystemSetSubtitleTokenEvent(
  token: Address
): SystemSetSubtitleToken {
  let systemSetSubtitleTokenEvent = changetype<SystemSetSubtitleToken>(
    newMockEvent()
  )

  systemSetSubtitleTokenEvent.parameters = new Array()

  systemSetSubtitleTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return systemSetSubtitleTokenEvent
}

export function createSystemSetVideoTokenEvent(
  token: Address
): SystemSetVideoToken {
  let systemSetVideoTokenEvent = changetype<SystemSetVideoToken>(newMockEvent())

  systemSetVideoTokenEvent.parameters = new Array()

  systemSetVideoTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return systemSetVideoTokenEvent
}

export function createSystemSetZimuTokenEvent(
  token: Address
): SystemSetZimuToken {
  let systemSetZimuTokenEvent = changetype<SystemSetZimuToken>(newMockEvent())

  systemSetZimuTokenEvent.parameters = new Array()

  systemSetZimuTokenEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return systemSetZimuTokenEvent
}

export function createUserInfoUpdateEvent(
  usr: Address,
  reputationSpread: BigInt,
  tokenSpread: BigInt
): UserInfoUpdate {
  let userInfoUpdateEvent = changetype<UserInfoUpdate>(newMockEvent())

  userInfoUpdateEvent.parameters = new Array()

  userInfoUpdateEvent.parameters.push(
    new ethereum.EventParam("usr", ethereum.Value.fromAddress(usr))
  )
  userInfoUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "reputationSpread",
      ethereum.Value.fromSignedBigInt(reputationSpread)
    )
  )
  userInfoUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "tokenSpread",
      ethereum.Value.fromSignedBigInt(tokenSpread)
    )
  )

  return userInfoUpdateEvent
}

export function createUserJoinEvent(
  user: Address,
  reputation: BigInt,
  deposit: BigInt
): UserJoin {
  let userJoinEvent = changetype<UserJoin>(newMockEvent())

  userJoinEvent.parameters = new Array()

  userJoinEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userJoinEvent.parameters.push(
    new ethereum.EventParam(
      "reputation",
      ethereum.Value.fromUnsignedBigInt(reputation)
    )
  )
  userJoinEvent.parameters.push(
    new ethereum.EventParam("deposit", ethereum.Value.fromSignedBigInt(deposit))
  )

  return userJoinEvent
}

export function createUserLockRewardUpdateEvent(
  user: Address,
  platform: Address,
  day: BigInt,
  reward: BigInt
): UserLockRewardUpdate {
  let userLockRewardUpdateEvent = changetype<UserLockRewardUpdate>(
    newMockEvent()
  )

  userLockRewardUpdateEvent.parameters = new Array()

  userLockRewardUpdateEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userLockRewardUpdateEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  userLockRewardUpdateEvent.parameters.push(
    new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigInt(day))
  )
  userLockRewardUpdateEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromSignedBigInt(reward))
  )

  return userLockRewardUpdateEvent
}

export function createUserWithdrawEvent(
  user: Address,
  platform: Address,
  day: Array<BigInt>,
  all: BigInt
): UserWithdraw {
  let userWithdrawEvent = changetype<UserWithdraw>(newMockEvent())

  userWithdrawEvent.parameters = new Array()

  userWithdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userWithdrawEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  userWithdrawEvent.parameters.push(
    new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigIntArray(day))
  )
  userWithdrawEvent.parameters.push(
    new ethereum.EventParam("all", ethereum.Value.fromUnsignedBigInt(all))
  )

  return userWithdrawEvent
}

export function createVideoCountsUpdateEvent(
  platform: Address,
  id: Array<BigInt>,
  counts: Array<BigInt>
): VideoCountsUpdate {
  let videoCountsUpdateEvent = changetype<VideoCountsUpdate>(newMockEvent())

  videoCountsUpdateEvent.parameters = new Array()

  videoCountsUpdateEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  videoCountsUpdateEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigIntArray(id))
  )
  videoCountsUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "counts",
      ethereum.Value.fromUnsignedBigIntArray(counts)
    )
  )

  return videoCountsUpdateEvent
}

export function createVideoCreateEvent(
  platform: Address,
  reealId: BigInt,
  id: BigInt,
  symbol: string,
  creator: Address,
  counts: BigInt
): VideoCreate {
  let videoCreateEvent = changetype<VideoCreate>(newMockEvent())

  videoCreateEvent.parameters = new Array()

  videoCreateEvent.parameters.push(
    new ethereum.EventParam("platform", ethereum.Value.fromAddress(platform))
  )
  videoCreateEvent.parameters.push(
    new ethereum.EventParam(
      "reealId",
      ethereum.Value.fromUnsignedBigInt(reealId)
    )
  )
  videoCreateEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  videoCreateEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  videoCreateEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  videoCreateEvent.parameters.push(
    new ethereum.EventParam("counts", ethereum.Value.fromUnsignedBigInt(counts))
  )

  return videoCreateEvent
}

export function createVideoPreExtractEvent(
  videoId: BigInt,
  unsettled: BigInt,
  surplus: BigInt
): VideoPreExtract {
  let videoPreExtractEvent = changetype<VideoPreExtract>(newMockEvent())

  videoPreExtractEvent.parameters = new Array()

  videoPreExtractEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoPreExtractEvent.parameters.push(
    new ethereum.EventParam(
      "unsettled",
      ethereum.Value.fromUnsignedBigInt(unsettled)
    )
  )
  videoPreExtractEvent.parameters.push(
    new ethereum.EventParam(
      "surplus",
      ethereum.Value.fromUnsignedBigInt(surplus)
    )
  )

  return videoPreExtractEvent
}
