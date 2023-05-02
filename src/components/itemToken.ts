import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ItemToken, Transfer } from "../../generated/ItemToken/ItemToken";
import { Item } from "../../generated/schema";
import {
  getOrCreateUser,
  getOrCreateRequire,
  getOrCreateTask,
} from "../murmes";
import { ONE_BI, ITEM_TOKEN, ZERO_BI, ZERO_ADDRESS } from "../utils";

export const ItemTokenContract = ItemToken.bind(Address.fromString(ITEM_TOKEN));

export function handleItemTransfer(event: Transfer): void {
  let item = getOrCreateItem(event.params.tokenId, event);
  if (event.params.from != Address.fromString(ZERO_ADDRESS)) {
    let oldOwner = getOrCreateUser(event.params.from, event);
    oldOwner.ownItemCount = oldOwner.ownItemCount.minus(ONE_BI);
    oldOwner.save();
  }
  let newOwner = getOrCreateUser(event.params.to, event);
  newOwner.ownItemCount = newOwner.ownItemCount.plus(ONE_BI);
  item.owner = newOwner.id;
  item.save();
  newOwner.save();
}

export function getOrCreateItem(itemId: BigInt, event: ethereum.Event): Item {
  let item = Item.load(itemId.toString());
  if (item === null) {
    item = new Item(itemId.toString());
    let base = ItemTokenContract.getItemBaseData(itemId);
    item.requires = getOrCreateRequire(base.getValue2()).id;
    item.fingerprint = ItemTokenContract.getItemFingerprint(itemId);
    let task = getOrCreateTask(base.getValue1(), event);
    item.task = task.id;
    task.save();
    item.state = "NORMAL";
    let uri = ItemTokenContract.try_tokenURI(itemId);
    if (!uri.reverted) {
      item.cid = uri.value;
    }
    let owner = ItemTokenContract.try_ownerOf(itemId);
    if (!owner.reverted) {
      item.owner = getOrCreateUser(owner.value, event).id;
    }
    item.maker = getOrCreateUser(base.getValue0(), event).id;
    item.time = event.block.timestamp.toI32();
    item.supporterCount = ZERO_BI;
    item.opponentCount = ZERO_BI;
    item.versionCount = 1;
    item.save();
  }
  return item;
}
