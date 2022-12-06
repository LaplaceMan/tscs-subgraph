import { BigInt, Address, ethereum } from "@graphprotocol/graph-ts";
import {
  Platforms,
  PlatformJoin,
  PlatformSetRate,
  VideoCreate,
} from "../../generated/Platforms/Platforms";

import { Platform, Video } from "../../generated/schema";
import { PLATFORM_MANAGER, ZERO_BI, ONE_BI } from "../utils";
import {
  getOrCreateDashboard,
  getOrCreateDayData,
  getOrCreateUser,
} from "../murmes";

export let PLATFORMS = Platforms.bind(Address.fromString(PLATFORM_MANAGER));

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
    let base = PLATFORMS.getVideoBaseInfo(videoId);
    video.realId = base.getValue1();
    video.creator = getOrCreateUser(base.getValue3(), event).id;
    video.orderId = videoId;
    video.save();
  }
  return video;
}

export function getOrCreatePlatform(
  platformAddress: Address,
  event: ethereum.Event
): Platform {
  let platform = Platform.load(platformAddress.toHexString());
  if (platform === null) {
    platform = new Platform(platformAddress.toHexString());
    let base = PLATFORMS.getPlatformBaseInfo(platformAddress);
    platform.name = base.getValue0();
    platform.symbol = base.getValue1();
    platform.platformId = base.getValue2();
    platform.rateCountsToProfit = base.getValue3();
    platform.rateAuditorDivide = base.getValue4();
    platform.time = event.block.timestamp.toI32();
    platform.videoCount = ZERO_BI;
    platform.save();
  }
  return platform;
}
