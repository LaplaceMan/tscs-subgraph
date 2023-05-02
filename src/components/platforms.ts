import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
import {
  RegisterPlatform,
  PlatformStateUpdate,
  BoxCreated,
} from "../../generated/Platforms/Events";
import { Platforms } from "../../generated/Platforms/Platforms";
import { Platform, Box } from "../../generated/schema";
import { PLATFORM_MANAGER, ZERO_BI, ONE_BI, MURMES_SYSTEM } from "../utils";
import {
  getOrCreateDashboard,
  getOrCreateDayData,
  getOrCreateUser,
} from "../murmes";

export const PlatformsContract = Platforms.bind(
  Address.fromString(PLATFORM_MANAGER)
);

export function handleRegisterPlatform(event: RegisterPlatform): void {
  let platform = new Platform(event.params.platform.toHexString());
  platform.name = event.params.name;
  platform.symbol = event.params.symbol;
  platform.platformId = event.params.platformId;
  platform.boxCount = ZERO_BI;
  platform.time = event.block.timestamp.toI32();
  platform.rateCountsToProfit = event.params.rate1;
  platform.rateAuditorDivide = event.params.rate2;
  platform.authorityModule = event.params.authority;
  let dashboard = getOrCreateDashboard();
  dashboard.platformCount = dashboard.platformCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.platformCount = dayData.platformCount.plus(ONE_BI);
  dayData.save();
  platform.save();
  dashboard.save();
}

export function handlePlatformStateUpdate(event: PlatformStateUpdate): void {
  let platform = getOrCreatePlatform(event.params.platform, event);
  platform.rateCountsToProfit = event.params.rate1;
  platform.rateAuditorDivide = event.params.rate2;
  platform.save();
}

export function handleBoxCreated(event: BoxCreated): void {
  let box = new Box(
    event.params.platform.toHexString() + event.params.boxId.toString()
  );
  let platform = getOrCreatePlatform(event.params.platform, event);
  platform.boxCount = platform.boxCount.plus(ONE_BI);
  box.platform = platform.id;
  box.realId = event.params.realId;
  box.orderId = event.params.boxId;
  box.time = event.block.timestamp.toI32();
  box.taskCount = ZERO_BI;
  box.creator = getOrCreateUser(event.params.creator, event).id;
  let dashboard = getOrCreateDashboard();
  dashboard.boxCount = dashboard.boxCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.boxCount = dayData.boxCount.plus(ONE_BI);
  box.save();
  dayData.save();
  platform.save();
  dashboard.save();
}

export function getOrCreateBox(
  platform: Address,
  boxId: BigInt,
  event: ethereum.Event
): Box {
  let box = Box.load(platform.toHexString() + boxId.toString());
  if (box === null) {
    let platform_ = getOrCreatePlatform(platform, event);
    box = new Box(platform.toHexString() + boxId.toString());
    box.platform = platform_.id;
    box.time = event.block.timestamp.toI32();
    box.taskCount = ZERO_BI;
    if (platform != Address.fromString(MURMES_SYSTEM)) {
      let base = PlatformsContract.getBox(boxId);
      box.realId = base.id;
      box.creator = getOrCreateUser(base.creator, event).id;
    }
    box.orderId = boxId;
    box.save();
  }
  return box;
}

export function getOrCreatePlatform(
  platformAddress: Address,
  event: ethereum.Event
): Platform {
  let platform = Platform.load(platformAddress.toHexString());
  if (platform === null) {
    platform = new Platform(platformAddress.toHexString());
    let base = PlatformsContract.getPlatform(platformAddress);
    platform.name = base.name;
    platform.symbol = base.symbol;
    platform.platformId = base.platformId;
    platform.rateCountsToProfit = base.rateAuditorDivide;
    platform.rateAuditorDivide = base.rateAuditorDivide;
    platform.time = event.block.timestamp.toI32();
    platform.authorityModule = base.authorityModule;
    platform.boxCount = ZERO_BI;
    platform.save();
  }
  return platform;
}
