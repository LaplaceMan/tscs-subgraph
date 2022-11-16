import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  SubtitleToken,
  SubtitleUpload,
  Transfer,
} from "../../generated/SubtitleToken/SubtitleToken";
import { Subtitle } from "../../generated/schema";
import {
  getOrCreateUser,
  getOrCreateLanguage,
  getOrCreateApplication,
  getOrCreateDashboard,
  getOrCreateDayData,
} from "../subtitle-system";
import { ONE_BI, SUBTITLE_TOKEN, ZERO_BI } from "../utils";

export const ST = SubtitleToken.bind(Address.fromString(SUBTITLE_TOKEN));

export function handleSubtitleUpload(event: SubtitleUpload): void {
  let subtitle = new Subtitle(event.params.subtitleId.toString());
  let maker = getOrCreateUser(event.params.maker, event);
  let application = getOrCreateApplication(event.params.applyId, event);
  maker.makeSubtitleCount = maker.makeSubtitleCount.plus(ONE_BI);
  maker.ownSubtitleCount = maker.ownSubtitleCount.plus(ONE_BI);
  application.subtitleCount = application.subtitleCount.plus(ONE_BI);
  subtitle.maker = maker.id;
  subtitle.owner = getOrCreateUser(event.params.maker, event).id;
  subtitle.language = getOrCreateLanguage(event.params.languageId).id;
  subtitle.cid = event.params.cid;
  subtitle.application = application.id;
  subtitle.state = "NORMAL";
  subtitle.fingerprint = event.params.fingerprint;
  subtitle.time = event.block.timestamp.toI32();
  subtitle.supporterCount = ZERO_BI;
  subtitle.dissenterCount = ZERO_BI;
  let dashboard = getOrCreateDashboard();
  dashboard.subtitleCount = dashboard.subtitleCount.plus(ONE_BI);
  let dayData = getOrCreateDayData(event);
  dayData.subtitleCount = dayData.subtitleCount.plus(ONE_BI);
  maker.save();
  dayData.save();
  subtitle.save();
  dashboard.save();
  application.save();
}

export function handleSTTransfer(event: Transfer): void {
  let subtitle = getOrCreateSubtitle(event.params.tokenId, event);
  let oldOwner = getOrCreateUser(event.params.from, event);
  let newOwner = getOrCreateUser(event.params.from, event);
  oldOwner.ownSubtitleCount = oldOwner.ownSubtitleCount.minus(ONE_BI);
  newOwner.ownSubtitleCount = newOwner.ownSubtitleCount.plus(ONE_BI);
  subtitle.owner = newOwner.id;
  oldOwner.save();
  newOwner.save();
  subtitle.save();
}

export function getOrCreateSubtitle(
  subtitleId: BigInt,
  event: ethereum.Event
): Subtitle {
  let subtitle = Subtitle.load(subtitleId.toString());
  if (subtitle === null) {
    subtitle = new Subtitle(subtitleId.toString());
    let base = ST.try_subtitleNFT(subtitleId);
    if (!base.reverted) {
      subtitle.language = getOrCreateLanguage(base.value.getLanguageId()).id;
      subtitle.fingerprint = base.value.getFingerprint();
      let application = getOrCreateApplication(base.value.getApplyId(), event);
      subtitle.application = application.id;
      application.save();
    }
    subtitle.state = "NORMAL";
    let uri = ST.try_tokenURI(subtitleId);
    if (!uri.reverted) {
      subtitle.cid = uri.value;
    }
    let owner = ST.try_ownerOf(subtitleId);
    if (!owner.reverted) {
      let maker = getOrCreateUser(owner.value, event);
      subtitle.maker = maker.id;
    }
    subtitle.time = event.block.timestamp.toI32();
    subtitle.owner = getOrCreateUser(owner.value, event).id;
    subtitle.supporterCount = ZERO_BI;
    subtitle.dissenterCount = ZERO_BI;
    subtitle.save();
  }
  return subtitle;
}
