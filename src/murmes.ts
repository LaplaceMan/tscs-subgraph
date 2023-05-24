import { BigInt, Address, ethereum, Bytes } from "@graphprotocol/graph-ts";
import {
  TaskPosted,
  RegisterRepuire,
  ItemSubmitted,
  ItemAudited,
  ItemStateUpdate,
  UserJoin,
  UserBaseDataUpdate,
  UserLockedRevenueUpdate,
  UserWithdrawDeposit,
  UserWithdrawRevenue,
  UserGuardUpdate,
  TaskStateUpdate,
  TaskCancelled,
  TaskReset,
} from "../generated/Murmes/Events";
import { Murmes } from "../generated/Murmes/Murmes";
import { ComponentGlobal } from "../generated/Murmes/ComponentGlobal";
import {
  Dashboard,
  DayData,
  Task,
  User,
  Revenue,
  Require,
  Audit,
  Item,
} from "../generated/schema";
import {
  MURMES_SYSTEM,
  ZERO_BI,
  ONE_BI,
  SETTLEMENT,
  COMPONENT_GLOBAL,
  ZERO_ADDRESS,
} from "./utils";
import { getOrCreateItem } from "./components/itemToken";
import { getOrCreateBox, getOrCreatePlatform } from "./components/platforms";
import {
  getOrCreateWhitelistedToken,
  getOrCreateWhitelistedAuditModule,
  getOrCreateWhitelistedDetectionModule,
} from "./components/moduleGlobal";

export const MurmesContract = Murmes.bind(Address.fromString(MURMES_SYSTEM));

export function handleRegisterRepuire(event: RegisterRepuire): void {
  let requireId = event.params.id;
  let requires = new Require(requireId.toString());
  requires.notes = event.params.require;
  requires.registrant = event.transaction.from;
  requires.time = event.block.timestamp.toI32();
  requires.taskCount = ZERO_BI;
  requires.itemCount = ZERO_BI;
  let dashboard = getOrCreateDashboard();
  dashboard.requireCount = dashboard.requireCount + 1;
  requires.save();
  dashboard.save();
}

export function handleUserJoin(event: UserJoin): void {
  let user = new User(event.params.user.toHexString());
  user.time = event.block.timestamp.toI32();
  user.taskCount = ZERO_BI;
  user.makeItemCount = ZERO_BI;
  user.reputation = event.params.reputation;
  user.deposit = event.params.deposit;
  user.ownItemCount = ZERO_BI;
  user.auditCount = ZERO_BI;
  user.adoptedCount = ZERO_BI;
  let dashboard = getOrCreateDashboard();
  let dayData = getOrCreateDayData(event);
  user.userId = dashboard.userCount.plus(ONE_BI);
  dayData.userCount = dayData.userCount.plus(ONE_BI);
  dashboard.userCount = dashboard.userCount.plus(ONE_BI);
  user.save();
  dayData.save();
  dashboard.save();
}

export function handleUserBaseDataUpdate(event: UserBaseDataUpdate): void {
  let user = getOrCreateUser(event.params.user, event);
  user.reputation = user.reputation.plus(event.params.reputationSpread);
  user.deposit = user.deposit.plus(event.params.tokenSpread);
  user.save();
}

export function handleUserLockedRevenueUpdate(
  event: UserLockedRevenueUpdate
): void {
  let reward = getOrCreateRevenue(
    event.params.user,
    event.params.platform,
    event.params.day,
    event
  );
  reward.locked = reward.locked.plus(event.params.revenue);
  reward.save();
}

export function handleUserWithdrawRevenue(event: UserWithdrawRevenue): void {
  let days = event.params.day;
  for (let i = 0; i < days.length; i++) {
    let reward = getOrCreateRevenue(
      event.params.caller,
      event.params.platform,
      days[i],
      event
    );
    reward.extracted = reward.extracted.plus(reward.locked);
    reward.locked = ZERO_BI;
    reward.save();
  }
}

export function handlePostTask(event: TaskPosted): void {
  let taskId = event.params.taskId;
  let task = new Task(taskId.toString());
  let user = getOrCreateUser(event.params.caller, event);
  let box = getOrCreateBox(
    event.params.vars.platform,
    event.params.vars.sourceId,
    event
  );
  box.taskCount = box.taskCount.plus(ONE_BI);
  user.taskCount = user.taskCount.plus(ONE_BI);
  task.box = box.id;
  task.applicant = user.id;
  task.amount = event.params.vars.amount;
  task.start = event.block.timestamp.toI32();
  task.deadline = event.params.vars.deadline;
  task.source = event.params.vars.source;
  task.itemCount = ZERO_BI;
  task.adopted = null;
  task.txHash = event.transaction.hash;
  let requires = getOrCreateRequire(event.params.vars.requireId);
  requires.taskCount = requires.taskCount.plus(ONE_BI);
  task.requires = requires.id;
  task.strategy = SETTLEMENT[event.params.vars.settlement];
  task.currency = getOrCreateWhitelistedToken(event.params.vars.currency).id;
  task.auditModule = getOrCreateWhitelistedAuditModule(
    event.params.vars.auditModule
  ).id;
  task.detectionModule = getOrCreateWhitelistedDetectionModule(
    event.params.vars.detectionModule
  ).id;
  task.state = "ONGOING";
  let dashboard = getOrCreateDashboard();
  dashboard.taskCount = dashboard.taskCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.taskCount = dayData.taskCount.plus(ONE_BI);
  user.save();
  box.save();
  task.save();
  dayData.save();
  requires.save();
  dashboard.save();
}

export function handleSubmitItem(event: ItemSubmitted): void {
  let item = new Item(event.params.itemId.toString());
  let maker = getOrCreateUser(event.params.maker, event);
  let task = getOrCreateTask(event.params.vars.taskId, event);
  maker.makeItemCount = maker.makeItemCount.plus(ONE_BI);
  maker.ownItemCount = maker.ownItemCount.plus(ONE_BI);
  task.itemCount = task.itemCount.plus(ONE_BI);
  item.maker = maker.id;
  item.owner = getOrCreateUser(event.params.maker, event).id;
  let requires = getOrCreateRequire(event.params.vars.requireId);
  requires.itemCount = requires.itemCount.plus(ONE_BI);
  item.requires = requires.id;
  item.cid = event.params.vars.cid;
  item.task = task.id;
  item.state = "NORMAL";
  item.fingerprint = event.params.vars.fingerprint;
  item.time = event.block.timestamp.toI32();
  item.supporterCount = ZERO_BI;
  item.opponentCount = ZERO_BI;
  item.txHash = event.transaction.hash;
  let dashboard = getOrCreateDashboard();
  dashboard.itemCount = dashboard.itemCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.itemCount = dayData.itemCount.plus(ONE_BI);
  task.save();
  item.save();
  maker.save();
  dayData.save();
  requires.save();
  dashboard.save();
}

export function handleAuditItem(event: ItemAudited): void {
  let item = getOrCreateItem(event.params.itemId, event);
  let attitude = event.params.attitude;
  let user = getOrCreateUser(event.params.auditor, event);
  let attitudeText = "";
  if (attitude == 0) {
    item.supporterCount = item.supporterCount.plus(ONE_BI);
    attitudeText = "SUPPORT";
  } else {
    item.opponentCount = item.opponentCount.plus(ONE_BI);
    attitudeText = "OPPOSE";
  }
  let audit = new Audit(
    event.params.auditor.toHexString() + "-" + event.params.itemId.toString()
  );
  user.auditCount = user.auditCount.plus(ONE_BI);
  audit.auditor = user.id;
  audit.item = item.id;
  audit.attitude = attitudeText;
  audit.txHash = event.transaction.hash;
  audit.time = event.block.timestamp.toI32();
  item.save();
  user.save();
  audit.save();
}

export function handleUserWithdrawDeposit(event: UserWithdrawDeposit): void {
  let user = getOrCreateUser(event.params.user, event);
  user.deposit = user.deposit.minus(event.params.amount);
  user.save();
}

export function handleUserGuardUpdate(event: UserGuardUpdate): void {
  let user = getOrCreateUser(event.params.user, event);
  user.guard = event.params.guard;
  user.save();
}

export function handleTaskCancelled(event: TaskCancelled): void {
  let task = getOrCreateTask(event.params.taskId, event);
  task.state = "CANCELLED";
  task.save();
}

export function handleTaskReset(event: TaskReset): void {
  let task = getOrCreateTask(event.params.taskId, event);
  task.adopted = null;
  const Contract = ComponentGlobal.bind(Address.fromString(COMPONENT_GLOBAL));
  const lockUpTime = Contract.lockUpTime();
  task.deadline = event.block.timestamp.plus(lockUpTime);
  task.state = "ONGOING";
  task.save();
}

export function handleItemStateUpdate(event: ItemStateUpdate): void {
  let item = getOrCreateItem(event.params.itemId, event);
  let state = event.params.state;
  if (state == 1) {
    item.state = "ADOPTED";
    let task = getOrCreateTask(BigInt.fromString(item.task), event);
    let maker = getOrCreateUser(Address.fromString(item.maker), event);
    maker.adoptedCount = maker.adoptedCount.plus(ONE_BI);
    task.adopted = item.id;
    task.state = "FINISHED";
    task.save();
    maker.save();
  } else if (state == 2) {
    item.state = "DELETED";
  }
  item.save();
}

export function handleTaskStateUpdate(event: TaskStateUpdate): void {
  let task = getOrCreateTask(event.params.taskId, event);
  task.deadline = task.deadline.plus(event.params.plusTime);
  task.amount = task.amount.plus(event.params.plusAmount);
  task.save();
}

export function getOrCreateUser(address: Address, event: ethereum.Event): User {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.adoptedCount = ZERO_BI;
    user.taskCount = ZERO_BI;
    user.makeItemCount = ZERO_BI;
    user.ownItemCount = ZERO_BI;
    user.auditCount = ZERO_BI;
    user.time = event.block.timestamp.toI32();
    let dashboard = getOrCreateDashboard();
    user.userId = dashboard.userCount.plus(ONE_BI);
    let contract = Murmes.bind(Address.fromString(MURMES_SYSTEM));
    let base = contract.getUserBaseData(address);
    user.reputation = base.getValue0();
    user.deposit = base.getValue1();
    dashboard.userCount = dashboard.userCount.plus(ONE_BI);
    dashboard.save();
    user.save();
  }
  return user;
}

export function getOrCreateDashboard(): Dashboard {
  let dashboard = Dashboard.load(MURMES_SYSTEM);
  if (dashboard === null) {
    dashboard = new Dashboard(MURMES_SYSTEM);
    dashboard.taskCount = ZERO_BI;
    dashboard.itemCount = ZERO_BI;
    dashboard.requireCount = 0;
    dashboard.platformCount = ZERO_BI;
    dashboard.boxCount = ZERO_BI;
    dashboard.userCount = ZERO_BI;
    dashboard.save();
  }
  return dashboard;
}

export function getOrCreateRequire(requireId: BigInt): Require {
  let requires = Require.load(requireId.toString());
  if (requires === null) {
    requires = new Require(requireId.toString());
    let base = MurmesContract.getRequiresNoteById(requireId);
    requires.notes = base;
    requires.time = 0;
    requires.registrant = Bytes.fromHexString(ZERO_ADDRESS);
    requires.taskCount = ZERO_BI;
    requires.itemCount = ZERO_BI;
    requires.save();
  }
  return requires;
}

export function getOrCreateRevenue(
  ownerAddress: Address,
  platformAddress: Address,
  day: BigInt,
  event: ethereum.Event
): Revenue {
  let revenue = Revenue.load(
    ownerAddress.toHexString() +
      "-" +
      platformAddress.toHexString() +
      "-" +
      day.toString()
  );
  if (revenue === null) {
    revenue = new Revenue(
      ownerAddress.toHexString() +
        "-" +
        platformAddress.toHexString() +
        "-" +
        day.toString()
    );
    revenue.day = day;
    revenue.user = getOrCreateUser(ownerAddress, event).id;
    revenue.platform = getOrCreatePlatform(platformAddress, event).id;
    revenue.locked = ZERO_BI;
    revenue.extracted = ZERO_BI;
    revenue.save();
  }
  return revenue;
}

export function getOrCreateTask(taskId: BigInt, event: ethereum.Event): Task {
  let task = Task.load(taskId.toString());
  if (task === null) {
    task = new Task(taskId.toString());
    let base = MurmesContract.try_tasks(taskId);
    if (!base.reverted) {
      let user = getOrCreateUser(base.value.getApplicant(), event);
      let box = getOrCreateBox(
        base.value.getPlatform(),
        base.value.getBoxId(),
        event
      );
      user.taskCount = user.taskCount.plus(ONE_BI);
      task.box = box.id;
      task.applicant = user.id;
      task.amount = base.value.getAmount();
      task.deadline = base.value.getDeadline();
      task.source = base.value.getSource();
      let requires = getOrCreateRequire(base.value.getRequireId());
      requires.taskCount = requires.taskCount.plus(ONE_BI);
      task.requires = requires.id;
      task.strategy = SETTLEMENT[base.value.getSettlement()];
      task.currency = getOrCreateWhitelistedToken(base.value.getCurrency()).id;
      task.auditModule = getOrCreateWhitelistedAuditModule(
        base.value.getAuditModule()
      ).id;
      task.detectionModule = getOrCreateWhitelistedDetectionModule(
        base.value.getDetectionModule()
      ).id;
      box.save();
      user.save();
      requires.save();
    }
    task.start = event.block.timestamp.toI32();
    task.itemCount = ZERO_BI;
    task.adopted = null;
    task.save();
  }
  return task;
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
    dayData.taskCount = ZERO_BI;
    dayData.platformCount = ZERO_BI;
    dayData.itemCount = ZERO_BI;
    dayData.boxCount = ZERO_BI;
    dayData.userCount = ZERO_BI;
    dayData.save();
  }
  return dayData;
}
