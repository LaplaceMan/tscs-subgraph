import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  ItemVersionUpdate,
  ItemVersionReportInvaild,
} from "../../generated/ItemVersionManagement/Events";
import { ItemVersionManagement } from "../../generated/ItemVersionManagement/ItemVersionManagement";
import { Version } from "../../generated/schema";
import { getOrCreateItem } from "./itemToken";
import { ITEM_VERSION_MANAGER } from "../utils";

export const ItemVersionContract = ItemVersionManagement.bind(
  Address.fromString(ITEM_VERSION_MANAGER)
);

export function handleItemVersionUpdate(event: ItemVersionUpdate): void {
  let item = getOrCreateItem(event.params.itemId, event);
  let version = new Version(
    event.params.itemId.toString() + "-" + event.params.versionId.toString()
  );
  version.item = item.id;
  version.cid = event.params.source;
  version.fingerprint = event.params.fingerprint;
  version.vaild = true;
  item.versionCount = item.versionCount + 1;
  item.save();
  version.save();
}

export function handleItemVersionReportInvaild(
  event: ItemVersionReportInvaild
): void {
  let version = getOrCreateVersion(
    event.params.itemId,
    event.params.versionId,
    event
  );
  version.vaild = false;
  version.save();
}

export function getOrCreateVersion(
  itemId: BigInt,
  versionId: BigInt,
  event: ethereum.Event
): Version {
  let version = Version.load(itemId.toString() + "-" + versionId.toString());
  if (version == null) {
    version = new Version(itemId.toString() + "-" + versionId.toString());
    let base = ItemVersionContract.getSpecifyVersion(itemId, versionId);
    let item = getOrCreateItem(itemId, event);
    version.item = item.id;
    version.cid = base.source;
    version.fingerprint = base.fingerprint;
    version.vaild = true;
    version.save();
  }
  return version;
}
