import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  SubtitleSystem,
  ApplicationSubmit,
  PlatformJoin,
  PlatformSetRate,
  RegisterLanguage,
  SubitlteGetEvaluation,
  SubtilteStateChange,
  SystemSetSettlement,
  UserJoin,
  UserLockRewardUpdate,
  UserWithdraw,
  VideoCreate
} from "../generated/SubtitleSystem/SubtitleSystem"

import { Dashboard, Application, User, Reward, SettlementStrategy, Language, Subtitle, Platform, Video } from "../generated/schema"
import { SUBTITLE_SYSTEM_ADDRESS, ZERO_BI, ONE_BI } from "./utils"

const TSCS = SubtitleSystem.bind(Address.fromString(SUBTITLE_SYSTEM_ADDRESS))

export function handleRegisterLanguage(event: RegisterLanguage): void {
  let dashboard = getOrCreateDashboard()
  dashboard.languageCount += 1
  let languageId = event.params.id
  let language = new Language('language-' + languageId.toString())
  language.languageId = languageId
  language.notes = event.params.language
  language.save()
  dashboard.save()
}

export function handleUserJoin(event: UserJoin): void {
  let user = new User(event.params.user.toHexString())
  let dashboard = getOrCreateDashboard()
  dashboard.userCount.plus(ONE_BI)
  user.save()
}

export function handleUserLockRewardUpdate(event: UserLockRewardUpdate): void {
  let reward = getOrCreateReward(event.params.user, event.params.platform, event.params.day)
  reward.locked.plus(event.params.reward)
  reward.save()
}

export function handleUserWithdraw(event: UserWithdraw): void {
  let days = event.params.day
  let reward
  for (let i = 0; i < days.length; i++) {
    reward = getOrCreateReward(event.params.user, event.params.platform, days[i])
    reward.extracted.plus(reward.locked)
    reward.locked = ZERO_BI
    reward.save()
  }
}

export function handlePlatformJoin(event: PlatformJoin): void {
  let platform = new Platform('platform-' + event.params.platform.toHexString())
  platform.name = event.params.name
  platform.symbol = event.params.symbol
  platform.owner = event.params.platform
  platform.platformId = event.params.id
  platform.rateCountsToProfit = event.params.rate1
  platform.rateAuditorDivide = event.params.rate2
  let dashboard = getOrCreateDashboard()
  dashboard.platformCount.plus(ONE_BI)
  platform.save()
}

export function handlePlatformSetRate(event: PlatformSetRate): void {
  let platform = getOrCreatePlatform(event.params.platform);
  platform.rateCountsToProfit = event.params.rate1
  platform.rateAuditorDivide = event.params.rate2
  platform.save()
}

export function handleSystemSetSettlement(event: SystemSetSettlement): void {
  let settlement = new SettlementStrategy('settlement-' + event.params.strategyId.toString())
  settlement.strategyId = event.params.strategyId
  settlement.address = event.params.strategy
  settlement.notes = event.params.notes
  let dashboard = getOrCreateDashboard()
  dashboard.settlementStrategyCount += 1
  dashboard.save()
  settlement.save()
}

export function handleApplicationSubmit(event: ApplicationSubmit): void {
  let applyId = event.params.applyId
  let application = new Application('application-' + applyId.toString());
  let user = getOrCreateUser(event.params.applicant)
  application.applicant = user.id
  application.amount = event.params.amount
  application.deadline = event.params.deadline
  application.applyId = applyId
  application.source = event.params.src
  application.language = getOrCreateLanguage(event.params.language).id
  application.strategy = getOrCreateSettlement(event.params.strategy).id
}

export function handleVideoCreate(event: VideoCreate): void {
  let video = new Video(event.params.platform.toHexString() + event.params.id.toString())
  video.platform = getOrCreatePlatform(event.params.platform).id
  video.realId = event.params.realId
  video.orderId = event.params.id
  video.creator = getOrCreateUser(event.params.creator).id
  video.save()
}

export function getOrCreateUser(address: Address): User {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    let dashboard = getOrCreateDashboard()
    dashboard.userCount.plus(ONE_BI)
    dashboard.save()
    user.save()
  }
  return user
}

export function getOrCreateDashboard(): Dashboard {
  let dashboard = Dashboard.load(SUBTITLE_SYSTEM_ADDRESS)
  if (dashboard === null) {
    dashboard = new Dashboard(SUBTITLE_SYSTEM_ADDRESS)
    dashboard.applicationCount = ZERO_BI
    dashboard.subtitleCount = ZERO_BI
    dashboard.languageCount = 0
    dashboard.platformCount = ZERO_BI
    dashboard.videoCount = ZERO_BI
    dashboard.userCount = ZERO_BI
    dashboard.settlementStrategyCount = 0
  }
  return dashboard
}

export function getOrCreateLanguage(languageId: number): Language {
  
  let language = Language.load('language-' + languageId.toString())
  if (language === null) {
    language = new Language('language-' + languageId.toString())
    language.languageId = languageId
    language.notes = ""
    language.save()
  }
  return language
}

export function getOrCreateSettlement(strategyId: number): SettlementStrategy {
  
  let settlement = SettlementStrategy.load('settlement-' + strategyId.toString())
  if (settlement === null) {
    settlement = new SettlementStrategy('settlement-' + strategyId.toString())
    settlement.strategyId = strategyId
    let base = TSCS.try_settlementStrategy(strategyId)
    settlement.address = base.value.value0
    settlement.notes = base.value.value1
    let dashboard = getOrCreateDashboard()
    dashboard.settlementStrategyCount += 1
    dashboard.save()
    settlement.save()
  }
  return settlement
}

export function getOrCreatePlatform(platformAddress: Address): Platform {
  let platform = Platform.load('platform-' + platformAddress.toHexString())
  if (platform === null) {
    platform = new Platform('platform-' + platformAddress.toHexString())
    let base = TSCS.try_platforms(platformAddress)
    platform.name = base.value.value0
    platform.symbol = base.value.value1
    platform.owner = platformAddress
    platform.platformId = base.value.value2
    platform.rateCountsToProfit = base.value.value3
    platform.rateAuditorDivide = base.value.value4
    let dashboard = getOrCreateDashboard()
    dashboard.platformCount.plus(ONE_BI)
    platform.save()
  }
  return platform
}

export function getOrCreateReward(ownerAddress: Address, platformAddress: Address, day: BigInt): Reward {
  let reward = Reward.load(ownerAddress.toHexString() + '-' + platformAddress.toHexString() + day.toString())
  if (reward === null) {
    reward = new Reward(ownerAddress.toHexString() + '-' + platformAddress.toHexString() + day.toString())
    reward.day = day
    reward.user = getOrCreateUser(ownerAddress).id
    reward.platform = getOrCreatePlatform(platformAddress)
    reward.locked = ZERO_BI
    reward.extracted = ZERO_BI
    reward.save()
  }
  return reward
}