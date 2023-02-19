import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
import {
  Murmes,
  ApplicationSubmit,
  RegisterLanguage,
  SubitlteGetEvaluation,
  SubtilteStateChange,
  SystemSetSettlementStrategy,
  UserJoin,
  UserInfoUpdate,
  UserLockRewardUpdate,
  UserWithdraw,
} from "../generated/Murmes/Murmes";

import {
  Dashboard,
  DayData,
  Application,
  User,
  Reward,
  SettlementStrategy,
  Language,
  Audit,
} from "../generated/schema";
import { MURMES_SYSTEM, ZERO_BI, ONE_BI } from "./utils";
import { getOrCreateSubtitle } from "./components/subtitle-token";
import { getOrCreateVideo, getOrCreatePlatform } from "./components/platforms";

export let MURMES = Murmes.bind(Address.fromString(MURMES_SYSTEM));

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

export function handleUserInfoUpdate(event: UserInfoUpdate): void {
  let user = getOrCreateUser(event.params.usr, event);
  user.reputation = event.params.reputationSpread;
  user.deposit = event.params.tokenSpread;
  user.save();
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

export function handleSystemSetSettlement(
  event: SystemSetSettlementStrategy
): void {
  let settlement = new SettlementStrategy(event.params.strategyId.toString());
  settlement.address = event.params.strategy;
  settlement.notes = event.params.note;
  let dashboard = getOrCreateDashboard();
  dashboard.settlementStrategyCount += 1;
  dashboard.save();
  settlement.save();
}

export function handleApplicationSubmit(event: ApplicationSubmit): void {
  let taskId = event.params.taskId;
  let application = new Application(taskId.toString());
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
    let application = getOrCreateApplication(event.params.taskId, event);
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
    let contract = Murmes.bind(Address.fromString(MURMES_SYSTEM));
    let base = contract.getUserBaseInfo(address);
    user.reputation = base.getValue0();
    user.deposit = base.getValue1();
    user.save();
  }
  return user;
}

export function getOrCreateDashboard(): Dashboard {
  let dashboard = Dashboard.load(MURMES_SYSTEM);
  if (dashboard === null) {
    dashboard = new Dashboard(MURMES_SYSTEM);
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

export function getOrCreateLanguage(languageId: BigInt): Language {
  let language = Language.load(languageId.toString());
  if (language === null) {
    language = new Language(languageId.toString());
    let base = MURMES.getLanguageNoteById(languageId);
    language.notes = base;
    language.save();
  }
  return language;
}

export function getOrCreateSettlement(strategyId: i32): SettlementStrategy {
  let settlement = SettlementStrategy.load(strategyId.toString());
  if (settlement === null) {
    settlement = new SettlementStrategy(strategyId.toString());
    let base = MURMES.getSettlementStrategyBaseInfo(strategyId);
    settlement.address = base.getValue0();
    settlement.notes = base.getValue1();
    settlement.save();
  }
  return settlement;
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
      "-" +
      day.toString()
  );
  if (reward === null) {
    reward = new Reward(
      ownerAddress.toHexString() +
        "-" +
        platformAddress.toHexString() +
        "-" +
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
  taskId: BigInt,
  event: ethereum.Event
): Application {
  let application = Application.load(taskId.toString());
  if (application === null) {
    application = new Application(taskId.toString());
    let base = MURMES.try_tasks(taskId);
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
