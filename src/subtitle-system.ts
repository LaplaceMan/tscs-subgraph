import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
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
  VideoCreate,
} from "../generated/SubtitleSystem/SubtitleSystem";

import {
  Dashboard,
  DayData,
  Application,
  User,
  Reward,
  SettlementStrategy,
  Language,
  Audit,
  Platform,
  Video,
} from "../generated/schema";
import { SUBTITLE_SYSTEM, ZERO_BI, ONE_BI } from "./utils";
import { getOrCreateSubtitle } from "./components/subtitle-token";

export const TSCS = SubtitleSystem.bind(Address.fromString(SUBTITLE_SYSTEM));

export function handleRegisterLanguage(event: RegisterLanguage): void {
  let languageId = event.params.id;
  let language = new Language(languageId.toString());
  language.notes = event.params.language;
  let dashboard = getOrCreateDashboard();
  dashboard.languageCount += 1;
  language.save();
  dashboard.save();
}

export function handleUserJoin(event: UserJoin): void {
  let user = new User(event.params.user.toHexString());
  user.time = event.block.timestamp.toI32();
  user.applicationCount = ZERO_BI;
  user.makeSubtitleCount = ZERO_BI;
  user.reputation = event.params.reputation;
  user.deposit = event.params.deposit;
  user.ownSubtitleCount = ZERO_BI;
  user.auditCount = ZERO_BI;
  user.adoptedCount = ZERO_BI;
  let dashboard = getOrCreateDashboard();
  let dayData = getOrCreateDayData(event);
  dayData.userCount = dayData.userCount.plus(ONE_BI);
  dashboard.userCount = dashboard.userCount.plus(ONE_BI);
  user.save();
  dayData.save();
  dashboard.save();
}

export function handleUserLockRewardUpdate(event: UserLockRewardUpdate): void {
  let reward = getOrCreateReward(
    event.params.user,
    event.params.platform,
    event.params.day,
    event
  );
  reward.locked = reward.locked.plus(event.params.reward);
  reward.save();
}

export function handleUserWithdraw(event: UserWithdraw): void {
  let days = event.params.day;
  for (let i = 0; i < days.length; i++) {
    let reward = getOrCreateReward(
      event.params.user,
      event.params.platform,
      days[i],
      event
    );
    reward.extracted = reward.extracted.plus(reward.locked);
    reward.locked = ZERO_BI;
    reward.save();
  }
}

export function handlePlatformJoin(event: PlatformJoin): void {
  let platform = new Platform(event.params.platform.toHexString());
  platform.name = event.params.name;
  platform.symbol = event.params.symbol;
  platform.platformId = event.params.id;
  platform.videoCount = ZERO_BI;
  platform.time = event.block.timestamp.toI32();
  platform.rateCountsToProfit = event.params.rate1;
  platform.rateAuditorDivide = event.params.rate2;
  let dashboard = getOrCreateDashboard();
  dashboard.platformCount = dashboard.platformCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.platformCount = dayData.platformCount.plus(ONE_BI);
  dayData.save();
  platform.save();
  dashboard.save();
}

export function handlePlatformSetRate(event: PlatformSetRate): void {
  let platform = getOrCreatePlatform(event.params.platform, event);
  platform.rateCountsToProfit = event.params.rate1;
  platform.rateAuditorDivide = event.params.rate2;
  platform.save();
}

export function handleSystemSetSettlement(event: SystemSetSettlement): void {
  let settlement = new SettlementStrategy(event.params.strategyId.toString());
  settlement.address = event.params.strategy;
  settlement.notes = event.params.notes;
  let dashboard = getOrCreateDashboard();
  dashboard.settlementStrategyCount += 1;
  dashboard.save();
  settlement.save();
}

export function handleApplicationSubmit(event: ApplicationSubmit): void {
  let applyId = event.params.applyId;
  let application = new Application(applyId.toString());
  let user = getOrCreateUser(event.params.applicant, event);
  let video = getOrCreateVideo(
    event.params.platform,
    event.params.videoId,
    event
  );
  video.applicationCount = video.applicationCount.plus(ONE_BI);
  user.applicationCount = user.applicationCount.plus(ONE_BI);
  application.video = video.id;
  application.applicant = user.id;
  application.amount = event.params.amount;
  application.start = event.block.timestamp.toI32();
  application.deadline = event.params.deadline;
  application.source = event.params.src;
  application.subtitleCount = ZERO_BI;
  application.adopted = null;
  application.txHash = event.transaction.hash;
  application.language = getOrCreateLanguage(event.params.language).id;
  application.strategy = getOrCreateSettlement(event.params.strategy).id;
  let dashboard = getOrCreateDashboard();
  dashboard.applicationCount = dashboard.applicationCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.applicationCount = dayData.applicationCount.plus(ONE_BI);
  user.save();
  video.save();
  dayData.save();
  dashboard.save();
  application.save();
}

export function handleVideoCreate(event: VideoCreate): void {
  let video = new Video(
    event.params.platform.toHexString() + event.params.id.toString()
  );
  let platform = getOrCreatePlatform(event.params.platform, event);
  platform.videoCount = platform.videoCount.plus(ONE_BI);
  video.platform = platform.id;
  video.realId = event.params.realId;
  video.orderId = event.params.id;
  video.time = event.block.timestamp.toI32();
  video.applicationCount = ZERO_BI;
  video.creator = getOrCreateUser(event.params.creator, event).id;
  let dashboard = getOrCreateDashboard();
  dashboard.videoCount = dashboard.videoCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.videoCount = dayData.videoCount.plus(ONE_BI);
  video.save();
  dayData.save();
  platform.save();
  dashboard.save();
}

export function handleSubitlteGetEvaluation(
  event: SubitlteGetEvaluation
): void {
  let subtitle = getOrCreateSubtitle(event.params.subtitleId, event);
  let attitude = event.params.attitude;
  let user = getOrCreateUser(event.params.evaluator, event);
  let attitudeText = "";
  if (attitude == 0) {
    subtitle.supporterCount = subtitle.supporterCount.plus(ONE_BI);
    attitudeText = "SUPPORT";
  } else {
    subtitle.dissenterCount = subtitle.dissenterCount.plus(ONE_BI);
    attitudeText = "OPPOSITION";
  }
  let audit = new Audit(
    event.params.evaluator.toHexString() +
      "-" +
      event.params.subtitleId.toString()
  );
  user.auditCount = user.auditCount.plus(ONE_BI);
  audit.auditor = user.id;
  audit.subtitle = subtitle.id;
  audit.attitude = attitudeText;
  audit.txHash = event.transaction.hash;
  audit.time = event.block.timestamp.toI32();
  user.save();
  audit.save();
  subtitle.save();
}

export function handleSubtilteStateChange(event: SubtilteStateChange): void {
  let subtitle = getOrCreateSubtitle(event.params.subtitleId, event);
  let state = event.params.state;
  if (state == 1) {
    subtitle.state = "ADOPTED";
    let application = getOrCreateApplication(event.params.applyId, event);
    let maker = getOrCreateUser(Address.fromString(subtitle.maker), event);
    maker.adoptedCount = maker.adoptedCount.plus(ONE_BI);
    application.adopted = subtitle.id;
    maker.save();
    application.save();
  } else if (state == 2) {
    subtitle.state = "DELETED";
  }
  subtitle.save();
}

export function getOrCreateVideo(
  platform: Address,
  videoId: BigInt,
  event: ethereum.Event
): Video {
  let video = Video.load(platform.toHexString() + videoId.toString());
  if (video === null) {
    let platform_ = getOrCreatePlatform(platform, event);
    video = new Video(platform.toHexString() + videoId.toString());
    video.platform = platform_.id;
    video.time = event.block.timestamp.toI32();
    video.applicationCount = ZERO_BI;
    let base = TSCS.try_videos(videoId);
    if (!base.reverted) {
      video.realId = base.value.getId();
      video.creator = getOrCreateUser(base.value.getCreator(), event).id;
    }
    video.orderId = videoId;
    video.save();
  }
  return video;
}

export function getOrCreateUser(address: Address, event: ethereum.Event): User {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.adoptedCount = ZERO_BI;
    user.applicationCount = ZERO_BI;
    user.makeSubtitleCount = ZERO_BI;
    user.ownSubtitleCount = ZERO_BI;
    user.auditCount = ZERO_BI;
    user.time = event.block.timestamp.toI32();
    let base = TSCS.getUserBaseInfo(address);
    user.reputation = base.getValue0();
    user.deposit = base.getValue1();
    user.save();
  }
  return user;
}

export function getOrCreateDashboard(): Dashboard {
  let dashboard = Dashboard.load(SUBTITLE_SYSTEM);
  if (dashboard === null) {
    dashboard = new Dashboard(SUBTITLE_SYSTEM);
    dashboard.applicationCount = ZERO_BI;
    dashboard.subtitleCount = ZERO_BI;
    dashboard.languageCount = 0;
    dashboard.platformCount = ZERO_BI;
    dashboard.videoCount = ZERO_BI;
    dashboard.userCount = ZERO_BI;
    dashboard.settlementStrategyCount = 0;
    dashboard.save();
  }
  return dashboard;
}

export function getOrCreateLanguage(languageId: i32): Language {
  let language = Language.load(languageId.toString());
  if (language === null) {
    language = new Language(languageId.toString());
    let base = TSCS.try_getLanguageType(languageId);
    if (!base.reverted) {
      language.notes = base.value;
    }
    language.save();
  }
  return language;
}

export function getOrCreateSettlement(strategyId: i32): SettlementStrategy {
  let settlement = SettlementStrategy.load(strategyId.toString());
  if (settlement === null) {
    settlement = new SettlementStrategy(strategyId.toString());
    let base = TSCS.try_settlementStrategy(strategyId);
    if (!base.reverted) {
      settlement.address = base.value.getStrategy();
      settlement.notes = base.value.getNotes();
    }
    settlement.save();
  }
  return settlement;
}

export function getOrCreatePlatform(
  platformAddress: Address,
  event: ethereum.Event
): Platform {
  let platform = Platform.load(platformAddress.toHexString());
  if (platform === null) {
    platform = new Platform(platformAddress.toHexString());
    let base = TSCS.try_platforms(platformAddress);
    if (!base.reverted) {
      platform.name = base.value.getName();
      platform.symbol = base.value.getSymbol();
      platform.platformId = base.value.getPlatformId();
      platform.rateCountsToProfit = base.value.getRateCountsToProfit();
      platform.rateAuditorDivide = base.value.getRateAuditorDivide();
    }
    platform.time = event.block.timestamp.toI32();
    platform.videoCount = ZERO_BI;
    platform.save();
  }
  return platform;
}

export function getOrCreateReward(
  ownerAddress: Address,
  platformAddress: Address,
  day: BigInt,
  event: ethereum.Event
): Reward {
  let reward = Reward.load(
    ownerAddress.toHexString() +
      "-" +
      platformAddress.toHexString() +
      day.toString()
  );
  if (reward === null) {
    reward = new Reward(
      ownerAddress.toHexString() +
        "-" +
        platformAddress.toHexString() +
        day.toString()
    );
    reward.day = day;
    reward.user = getOrCreateUser(ownerAddress, event).id;
    reward.platform = getOrCreatePlatform(platformAddress, event).id;
    reward.locked = ZERO_BI;
    reward.extracted = ZERO_BI;
    reward.save();
  }
  return reward;
}

export function getOrCreateApplication(
  applyId: BigInt,
  event: ethereum.Event
): Application {
  let application = Application.load(applyId.toString());
  if (application === null) {
    application = new Application(applyId.toString());
    let base = TSCS.try_totalApplys(applyId);
    if (!base.reverted) {
      let user = getOrCreateUser(base.value.getApplicant(), event);
      let video = getOrCreateVideo(
        base.value.getPlatform(),
        base.value.getVideoId(),
        event
      );
      user.applicationCount = user.applicationCount.plus(ONE_BI);
      application.video = video.id;
      application.applicant = user.id;
      application.amount = base.value.getAmount();
      application.deadline = base.value.getDeadline();
      application.source = base.value.getSource();
      application.language = getOrCreateLanguage(base.value.getLanguage()).id;
      application.strategy = getOrCreateSettlement(base.value.getStrategy()).id;
      user.save();
      video.save();
    }
    application.start = event.block.timestamp.toI32();
    application.subtitleCount = ZERO_BI;
    application.adopted = null;
    application.save();
  }
  return application;
}

export function getOrCreateDayData(event: ethereum.Event): DayData {
  let timestamp = event.block.timestamp.toI32();
  let dayId = timestamp / 86400;
  let dayData = DayData.load(dayId.toString());
  if (dayData === null) {
    dayData = new DayData(dayId.toString());
    let dashboard = getOrCreateDashboard();
    dayData.dashboard = dashboard.id;
    dayData.day = dayId;
    dayData.applicationCount = ZERO_BI;
    dayData.platformCount = ZERO_BI;
    dayData.subtitleCount = ZERO_BI;
    dayData.videoCount = ZERO_BI;
    dayData.userCount = ZERO_BI;
    dayData.save();
  }
  return dayData;
}
