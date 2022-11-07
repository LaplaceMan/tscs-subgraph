import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts"
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

import { Dashboard, DayData, Application, User, Reward, SettlementStrategy, Language, Audit, Platform, Video } from "../generated/schema"
import { SUBTITLE_SYSTEM_ADDRESS, ZERO_BI, ONE_BI } from "./utils"
import { getOrCreateSubtitle } from "./components/subtitle-token"

export const TSCS = SubtitleSystem.bind(Address.fromString(SUBTITLE_SYSTEM_ADDRESS))

export function handleRegisterLanguage(event: RegisterLanguage): void {
  let languageId = event.params.id
  let language = new Language(languageId.toString())
  language.notes = event.params.language
  let dashboard = getOrCreateDashboard()
  dashboard.languageCount += 1
  language.save()
  dashboard.save()
}

export function handleUserJoin(event: UserJoin): void {
  let user = new User(event.params.user.toHexString())
  user.time = event.block.timestamp.toI32()
  user.applicationNumber = ZERO_BI
  user.subtitleNumber = ZERO_BI
  user.auditNumber = ZERO_BI
  user.adoptedNumber = ZERO_BI
  let dashboard = getOrCreateDashboard()
  let dayData = getOrCreateDayData(event)
  dayData.userCount.plus(ONE_BI)
  dashboard.userCount.plus(ONE_BI)
  dayData.save()
  dashboard.save()
  user.save()

}

export function handleUserLockRewardUpdate(event: UserLockRewardUpdate): void {
  let reward = getOrCreateReward(event.params.user, event.params.platform, event.params.day, event)
  reward.locked.plus(event.params.reward)
  reward.save()
}

export function handleUserWithdraw(event: UserWithdraw): void {
  let days = event.params.day
  for (let i = 0; i < days.length; i++) {
    let reward = getOrCreateReward(event.params.user, event.params.platform, days[i], event)
    reward.extracted.plus(reward.locked)
    reward.locked = ZERO_BI
    reward.save()
  }
}

export function handlePlatformJoin(event: PlatformJoin): void {
  let platform = new Platform(event.params.platform.toHexString())
  platform.name = event.params.name
  platform.symbol = event.params.symbol
  platform.owner = event.params.platform
  platform.platformId = event.params.id
  platform.videoNumber = ZERO_BI
  platform.time = event.block.timestamp.toI32()
  platform.rateCountsToProfit = event.params.rate1
  platform.rateAuditorDivide = event.params.rate2
  let dashboard = getOrCreateDashboard()
  dashboard.platformCount.plus(ONE_BI)
  let dayData = getOrCreateDayData(event)
  dayData.platformCount.plus(ONE_BI)
  dayData.save()
  dashboard.save()
  platform.save()
}

export function handlePlatformSetRate(event: PlatformSetRate): void {
  let platform = getOrCreatePlatform(event.params.platform, event);
  platform.rateCountsToProfit = event.params.rate1
  platform.rateAuditorDivide = event.params.rate2
  platform.save()
}

export function handleSystemSetSettlement(event: SystemSetSettlement): void {
  let settlement = new SettlementStrategy(event.params.strategyId.toString())
  settlement.address = event.params.strategy
  settlement.notes = event.params.notes
  let dashboard = getOrCreateDashboard()
  dashboard.settlementStrategyCount += 1
  dashboard.save()
  settlement.save()
}

export function handleApplicationSubmit(event: ApplicationSubmit): void {
  let applyId = event.params.applyId
  let application = new Application(applyId.toString());
  let user = getOrCreateUser(event.params.applicant, event)
  let video = getOrCreateVideo(event.params.platform, event.params.videoId, event)
  video.applicationNumber.plus(ONE_BI)
  user.applicationNumber.plus(ONE_BI)
  application.applicant = user.id
  application.amount = event.params.amount
  application.start = event.block.timestamp.toI32()
  application.deadline = event.params.deadline
  application.source = event.params.src
  application.subtitleNumber = ZERO_BI
  application.language = getOrCreateLanguage(event.params.language).id
  application.strategy = getOrCreateSettlement(event.params.strategy).id
  let dashboard = getOrCreateDashboard()
  dashboard.applicationCount.plus(ONE_BI)
  let dayData = getOrCreateDayData(event)
  dayData.applicationCount.plus(ONE_BI)
  user.save()
  video.save()
  dayData.save()
  dashboard.save()
  application.save()
}

export function handleVideoCreate(event: VideoCreate): void {
  let video = new Video(event.params.platform.toHexString() + event.params.id.toString())
  let platform = getOrCreatePlatform(event.params.platform, event)
  platform.videoNumber.plus(ONE_BI)
  video.platform = platform.id
  video.realId = event.params.realId
  video.orderId = event.params.id
  video.time = event.block.timestamp.toI32()
  video.applicationNumber = ZERO_BI
  video.creator = getOrCreateUser(event.params.creator, event).id
  let dashboard = getOrCreateDashboard()
  dashboard.videoCount.plus(ONE_BI)
  let dayData = getOrCreateDayData(event)
  dayData.videoCount.plus(ONE_BI)
  platform.save()
  dayData.save()
  dashboard.save()
  video.save()
}

export function handleSubitlteGetEvaluation(event: SubitlteGetEvaluation): void {
  let subtitle = getOrCreateSubtitle(event.params.subtitleId, event)
  let attitude = event.params.attitude
  let user = getOrCreateUser(event.params.evaluator, event)
  let attitudeText = ""
  if (attitude == 0) {
    subtitle.supporterCount.plus(ONE_BI)
    attitudeText = "SUPPORT"
  } else {
    subtitle.dissenterCount.plus(ONE_BI)
    attitudeText = "OPPOSITION"
  }
  let audit = new Audit(event.params.evaluator.toHexString() + '-' + event.params.subtitleId.toString())
  user.auditNumber.plus(ONE_BI)
  audit.auditor = user.id
  audit.subtitle = subtitle.id
  audit.attitude = attitudeText
  audit.time = event.block.timestamp.toI32()
  user.save()
  audit.save()
  subtitle.save()
}

export function handleSubtilteStateChange(event: SubtilteStateChange): void {
  let subtitle = getOrCreateSubtitle(event.params.subtitleId, event)
  let state = event.params.state
  if (state == 1) {
    subtitle.state = "ADOPTED"
    let application = getOrCreateApplication(event.params.applyId, event)
    let maker = getOrCreateUser(Address.fromHexString(subtitle.maker), event)
    maker.adoptedNumber.plus(ONE_BI)
    application.adopted = subtitle.id
    application.save()
    maker.save()
  } else if (state == 2) {
    subtitle.state = "DELETED"
  }
  subtitle.save()
}

export function getOrCreateVideo(platform: Address, videoId: BigInt, event: ethereum.Event): Video {
  let video = new Video(platform.toHexString() + videoId.toString())
  if (video === null) {
    let platform = getOrCreatePlatform(platform, event)
    video = new Video(platform.toHexString() + videoId.toString())
    video.platform = platform.id
    video.time = event.block.timestamp.toI32()
    platform.videoNumber.plus(ONE_BI)
    let base = TSCS.try_videos(videoId)
    video.realId = base.value.getId()
    video.orderId = videoId
    video.creator = getOrCreateUser(base.value.getCreator(), event).id
    video.save()
    platform.save()
  }
  return video
}

export function getOrCreateUser(address: Address, event: ethereum.Event): User {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    user.adoptedNumber = ZERO_BI
    user.applicationNumber = ZERO_BI
    user.subtitleNumber = ZERO_BI
    user.auditNumber = ZERO_BI
    let dashboard = getOrCreateDashboard()
    dashboard.userCount.plus(ONE_BI)
    let dayData = getOrCreateDayData(event)
    dayData.userCount.plus(ONE_BI)
    dayData.save()
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

export function getOrCreateLanguage(languageId: i32): Language {
  let language = Language.load(languageId.toString())
  if (language === null) {
    language = new Language(languageId.toString())
    let base = TSCS.try_getLanguageType(languageId)
    language.notes = base.value
    language.save()
  }
  return language
}

export function getOrCreateSettlement(strategyId: i32): SettlementStrategy {
  let settlement = SettlementStrategy.load(strategyId.toString())
  if (settlement === null) {
    settlement = new SettlementStrategy(strategyId.toString())
    let base = TSCS.try_settlementStrategy(strategyId)
    settlement.address = base.value.getStrategy()
    settlement.notes = base.value.getNotes()
    let dashboard = getOrCreateDashboard()
    dashboard.settlementStrategyCount += 1
    dashboard.save()
    settlement.save()
  }
  return settlement
}

export function getOrCreatePlatform(platformAddress: Address, event: ethereum.Event): Platform {
  let platform = Platform.load(platformAddress.toHexString())
  if (platform === null) {
    platform = new Platform(platformAddress.toHexString())
    let base = TSCS.try_platforms(platformAddress)
    platform.name = base.value.getName()
    platform.symbol = base.value.getSymbol()
    platform.owner = platformAddress
    platform.videoNumber = ZERO_BI
    platform.platformId = base.value.getPlatformId()
    platform.rateCountsToProfit = base.value.getRateCountsToProfit()
    platform.rateAuditorDivide = base.value.getRateAuditorDivide()
    let dashboard = getOrCreateDashboard()
    let dayData = getOrCreateDayData(event)
    dayData.platformCount.plus(ONE_BI)
    dayData.save()
    dashboard.save()
    platform.save()
  }
  return platform
}

export function getOrCreateReward(ownerAddress: Address, platformAddress: Address, day: BigInt, event: ethereum.Event): Reward {
  let reward = Reward.load(ownerAddress.toHexString() + '-' + platformAddress.toHexString() + day.toString())
  if (reward === null) {
    reward = new Reward(ownerAddress.toHexString() + '-' + platformAddress.toHexString() + day.toString())
    reward.day = day
    reward.user = getOrCreateUser(ownerAddress, event).id
    reward.platform = getOrCreatePlatform(platformAddress, event).id
    reward.locked = ZERO_BI
    reward.extracted = ZERO_BI
    reward.save()
  }
  return reward
}

export function getOrCreateApplication(applyId: BigInt, event: ethereum.Event): Application {
  let application = Application.load(applyId.toString())
  if (application === null) {
    application = new Application(applyId.toString())
    let base = TSCS.try_totalApplys(applyId)
    let user = getOrCreateUser(base.value.getApplicant(), event)
    user.applicationNumber.plus(ONE_BI)
    application.applicant = user.id
    application.amount = base.value.getAmount()
    application.deadline = base.value.getDeadline()
    application.source = base.value.getSource()
    application.subtitleNumber = ZERO_BI
    application.language = getOrCreateLanguage(base.value.getLanguage()).id
    application.strategy = getOrCreateSettlement(base.value.getStrategy()).id
    let dayData = getOrCreateDayData(event)
    dayData.applicationCount.plus(ONE_BI)
    user.save()
    dayData.save()
    application.save()
  }
  return application
}

export function getOrCreateDayData(event: ethereum.Event): DayData {
  let timestamp = event.block.timestamp.toI32()
  let dayId = timestamp / 86400
  let dayData = DayData.load(dayId.toString())
  if (dayData === null) {
    dayData = new DayData(dayId.toString())
    let dashboard = getOrCreateDashboard()
    dayData.dashboard = dashboard.id
    dayData.day = dayId
    dayData.applicationCount = ZERO_BI
    dayData.platformCount = ZERO_BI
    dayData.subtitleCount = ZERO_BI
    dayData.videoCount = ZERO_BI
    dayData.userCount = ZERO_BI
  }
  return dayData
}