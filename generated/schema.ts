// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Dashboard extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Dashboard entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Dashboard must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Dashboard", id.toString(), this);
    }
  }

  static load(id: string): Dashboard | null {
    return changetype<Dashboard | null>(store.get("Dashboard", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get applicationCount(): BigInt {
    let value = this.get("applicationCount");
    return value!.toBigInt();
  }

  set applicationCount(value: BigInt) {
    this.set("applicationCount", Value.fromBigInt(value));
  }

  get subtitleCount(): BigInt {
    let value = this.get("subtitleCount");
    return value!.toBigInt();
  }

  set subtitleCount(value: BigInt) {
    this.set("subtitleCount", Value.fromBigInt(value));
  }

  get languageCount(): i32 {
    let value = this.get("languageCount");
    return value!.toI32();
  }

  set languageCount(value: i32) {
    this.set("languageCount", Value.fromI32(value));
  }

  get platformCount(): BigInt {
    let value = this.get("platformCount");
    return value!.toBigInt();
  }

  set platformCount(value: BigInt) {
    this.set("platformCount", Value.fromBigInt(value));
  }

  get videoCount(): BigInt {
    let value = this.get("videoCount");
    return value!.toBigInt();
  }

  set videoCount(value: BigInt) {
    this.set("videoCount", Value.fromBigInt(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value!.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }

  get settlementStrategyCount(): i32 {
    let value = this.get("settlementStrategyCount");
    return value!.toI32();
  }

  set settlementStrategyCount(value: i32) {
    this.set("settlementStrategyCount", Value.fromI32(value));
  }

  get dayData(): Array<string> | null {
    let value = this.get("dayData");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set dayData(value: Array<string> | null) {
    if (!value) {
      this.unset("dayData");
    } else {
      this.set("dayData", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class DayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DayData must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DayData", id.toString(), this);
    }
  }

  static load(id: string): DayData | null {
    return changetype<DayData | null>(store.get("DayData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dashboard(): string {
    let value = this.get("dashboard");
    return value!.toString();
  }

  set dashboard(value: string) {
    this.set("dashboard", Value.fromString(value));
  }

  get day(): i32 {
    let value = this.get("day");
    return value!.toI32();
  }

  set day(value: i32) {
    this.set("day", Value.fromI32(value));
  }

  get applicationCount(): BigInt {
    let value = this.get("applicationCount");
    return value!.toBigInt();
  }

  set applicationCount(value: BigInt) {
    this.set("applicationCount", Value.fromBigInt(value));
  }

  get subtitleCount(): BigInt {
    let value = this.get("subtitleCount");
    return value!.toBigInt();
  }

  set subtitleCount(value: BigInt) {
    this.set("subtitleCount", Value.fromBigInt(value));
  }

  get platformCount(): BigInt {
    let value = this.get("platformCount");
    return value!.toBigInt();
  }

  set platformCount(value: BigInt) {
    this.set("platformCount", Value.fromBigInt(value));
  }

  get videoCount(): BigInt {
    let value = this.get("videoCount");
    return value!.toBigInt();
  }

  set videoCount(value: BigInt) {
    this.set("videoCount", Value.fromBigInt(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value!.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }
}

export class Application extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Application entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Application must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Application", id.toString(), this);
    }
  }

  static load(id: string): Application | null {
    return changetype<Application | null>(store.get("Application", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get applicant(): string {
    let value = this.get("applicant");
    return value!.toString();
  }

  set applicant(value: string) {
    this.set("applicant", Value.fromString(value));
  }

  get video(): string {
    let value = this.get("video");
    return value!.toString();
  }

  set video(value: string) {
    this.set("video", Value.fromString(value));
  }

  get strategy(): string {
    let value = this.get("strategy");
    return value!.toString();
  }

  set strategy(value: string) {
    this.set("strategy", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get language(): string {
    let value = this.get("language");
    return value!.toString();
  }

  set language(value: string) {
    this.set("language", Value.fromString(value));
  }

  get start(): i32 {
    let value = this.get("start");
    return value!.toI32();
  }

  set start(value: i32) {
    this.set("start", Value.fromI32(value));
  }

  get deadline(): BigInt {
    let value = this.get("deadline");
    return value!.toBigInt();
  }

  set deadline(value: BigInt) {
    this.set("deadline", Value.fromBigInt(value));
  }

  get source(): string {
    let value = this.get("source");
    return value!.toString();
  }

  set source(value: string) {
    this.set("source", Value.fromString(value));
  }

  get subtitleCount(): BigInt {
    let value = this.get("subtitleCount");
    return value!.toBigInt();
  }

  set subtitleCount(value: BigInt) {
    this.set("subtitleCount", Value.fromBigInt(value));
  }

  get subtitles(): Array<string> | null {
    let value = this.get("subtitles");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set subtitles(value: Array<string> | null) {
    if (!value) {
      this.unset("subtitles");
    } else {
      this.set("subtitles", Value.fromStringArray(<Array<string>>value));
    }
  }

  get adopted(): string | null {
    let value = this.get("adopted");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set adopted(value: string | null) {
    if (!value) {
      this.unset("adopted");
    } else {
      this.set("adopted", Value.fromString(<string>value));
    }
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get time(): i32 {
    let value = this.get("time");
    return value!.toI32();
  }

  set time(value: i32) {
    this.set("time", Value.fromI32(value));
  }

  get reputation(): BigInt {
    let value = this.get("reputation");
    return value!.toBigInt();
  }

  set reputation(value: BigInt) {
    this.set("reputation", Value.fromBigInt(value));
  }

  get deposit(): BigInt {
    let value = this.get("deposit");
    return value!.toBigInt();
  }

  set deposit(value: BigInt) {
    this.set("deposit", Value.fromBigInt(value));
  }

  get applicationCount(): BigInt {
    let value = this.get("applicationCount");
    return value!.toBigInt();
  }

  set applicationCount(value: BigInt) {
    this.set("applicationCount", Value.fromBigInt(value));
  }

  get makeSubtitleCount(): BigInt {
    let value = this.get("makeSubtitleCount");
    return value!.toBigInt();
  }

  set makeSubtitleCount(value: BigInt) {
    this.set("makeSubtitleCount", Value.fromBigInt(value));
  }

  get ownSubtitleCount(): BigInt {
    let value = this.get("ownSubtitleCount");
    return value!.toBigInt();
  }

  set ownSubtitleCount(value: BigInt) {
    this.set("ownSubtitleCount", Value.fromBigInt(value));
  }

  get auditCount(): BigInt {
    let value = this.get("auditCount");
    return value!.toBigInt();
  }

  set auditCount(value: BigInt) {
    this.set("auditCount", Value.fromBigInt(value));
  }

  get adoptedCount(): BigInt {
    let value = this.get("adoptedCount");
    return value!.toBigInt();
  }

  set adoptedCount(value: BigInt) {
    this.set("adoptedCount", Value.fromBigInt(value));
  }

  get rewards(): Array<string> {
    let value = this.get("rewards");
    return value!.toStringArray();
  }

  set rewards(value: Array<string>) {
    this.set("rewards", Value.fromStringArray(value));
  }

  get applications(): Array<string> | null {
    let value = this.get("applications");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set applications(value: Array<string> | null) {
    if (!value) {
      this.unset("applications");
    } else {
      this.set("applications", Value.fromStringArray(<Array<string>>value));
    }
  }

  get subtitlesMaker(): Array<string> | null {
    let value = this.get("subtitlesMaker");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set subtitlesMaker(value: Array<string> | null) {
    if (!value) {
      this.unset("subtitlesMaker");
    } else {
      this.set("subtitlesMaker", Value.fromStringArray(<Array<string>>value));
    }
  }

  get subtitlesOwner(): Array<string> | null {
    let value = this.get("subtitlesOwner");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set subtitlesOwner(value: Array<string> | null) {
    if (!value) {
      this.unset("subtitlesOwner");
    } else {
      this.set("subtitlesOwner", Value.fromStringArray(<Array<string>>value));
    }
  }

  get audits(): Array<string> {
    let value = this.get("audits");
    return value!.toStringArray();
  }

  set audits(value: Array<string>) {
    this.set("audits", Value.fromStringArray(value));
  }
}

export class Reward extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Reward entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Reward must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Reward", id.toString(), this);
    }
  }

  static load(id: string): Reward | null {
    return changetype<Reward | null>(store.get("Reward", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get day(): BigInt {
    let value = this.get("day");
    return value!.toBigInt();
  }

  set day(value: BigInt) {
    this.set("day", Value.fromBigInt(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get platform(): string {
    let value = this.get("platform");
    return value!.toString();
  }

  set platform(value: string) {
    this.set("platform", Value.fromString(value));
  }

  get locked(): BigInt {
    let value = this.get("locked");
    return value!.toBigInt();
  }

  set locked(value: BigInt) {
    this.set("locked", Value.fromBigInt(value));
  }

  get extracted(): BigInt {
    let value = this.get("extracted");
    return value!.toBigInt();
  }

  set extracted(value: BigInt) {
    this.set("extracted", Value.fromBigInt(value));
  }
}

export class SettlementStrategy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SettlementStrategy entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SettlementStrategy must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SettlementStrategy", id.toString(), this);
    }
  }

  static load(id: string): SettlementStrategy | null {
    return changetype<SettlementStrategy | null>(
      store.get("SettlementStrategy", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get notes(): string {
    let value = this.get("notes");
    return value!.toString();
  }

  set notes(value: string) {
    this.set("notes", Value.fromString(value));
  }
}

export class Language extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Language entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Language must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Language", id.toString(), this);
    }
  }

  static load(id: string): Language | null {
    return changetype<Language | null>(store.get("Language", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get notes(): string {
    let value = this.get("notes");
    return value!.toString();
  }

  set notes(value: string) {
    this.set("notes", Value.fromString(value));
  }
}

export class Subtitle extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Subtitle entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Subtitle must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Subtitle", id.toString(), this);
    }
  }

  static load(id: string): Subtitle | null {
    return changetype<Subtitle | null>(store.get("Subtitle", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get maker(): string {
    let value = this.get("maker");
    return value!.toString();
  }

  set maker(value: string) {
    this.set("maker", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get time(): i32 {
    let value = this.get("time");
    return value!.toI32();
  }

  set time(value: i32) {
    this.set("time", Value.fromI32(value));
  }

  get application(): string {
    let value = this.get("application");
    return value!.toString();
  }

  set application(value: string) {
    this.set("application", Value.fromString(value));
  }

  get language(): string {
    let value = this.get("language");
    return value!.toString();
  }

  set language(value: string) {
    this.set("language", Value.fromString(value));
  }

  get cid(): string {
    let value = this.get("cid");
    return value!.toString();
  }

  set cid(value: string) {
    this.set("cid", Value.fromString(value));
  }

  get fingerprint(): BigInt {
    let value = this.get("fingerprint");
    return value!.toBigInt();
  }

  set fingerprint(value: BigInt) {
    this.set("fingerprint", Value.fromBigInt(value));
  }

  get state(): string {
    let value = this.get("state");
    return value!.toString();
  }

  set state(value: string) {
    this.set("state", Value.fromString(value));
  }

  get supporterCount(): BigInt {
    let value = this.get("supporterCount");
    return value!.toBigInt();
  }

  set supporterCount(value: BigInt) {
    this.set("supporterCount", Value.fromBigInt(value));
  }

  get dissenterCount(): BigInt {
    let value = this.get("dissenterCount");
    return value!.toBigInt();
  }

  set dissenterCount(value: BigInt) {
    this.set("dissenterCount", Value.fromBigInt(value));
  }
}

export class Platform extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Platform entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Platform must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Platform", id.toString(), this);
    }
  }

  static load(id: string): Platform | null {
    return changetype<Platform | null>(store.get("Platform", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get time(): i32 {
    let value = this.get("time");
    return value!.toI32();
  }

  set time(value: i32) {
    this.set("time", Value.fromI32(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get platformId(): BigInt {
    let value = this.get("platformId");
    return value!.toBigInt();
  }

  set platformId(value: BigInt) {
    this.set("platformId", Value.fromBigInt(value));
  }

  get videoCount(): BigInt {
    let value = this.get("videoCount");
    return value!.toBigInt();
  }

  set videoCount(value: BigInt) {
    this.set("videoCount", Value.fromBigInt(value));
  }

  get rateCountsToProfit(): i32 {
    let value = this.get("rateCountsToProfit");
    return value!.toI32();
  }

  set rateCountsToProfit(value: i32) {
    this.set("rateCountsToProfit", Value.fromI32(value));
  }

  get rateAuditorDivide(): i32 {
    let value = this.get("rateAuditorDivide");
    return value!.toI32();
  }

  set rateAuditorDivide(value: i32) {
    this.set("rateAuditorDivide", Value.fromI32(value));
  }

  get videos(): Array<string> | null {
    let value = this.get("videos");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set videos(value: Array<string> | null) {
    if (!value) {
      this.unset("videos");
    } else {
      this.set("videos", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Video extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Video entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Video must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Video", id.toString(), this);
    }
  }

  static load(id: string): Video | null {
    return changetype<Video | null>(store.get("Video", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get platform(): string {
    let value = this.get("platform");
    return value!.toString();
  }

  set platform(value: string) {
    this.set("platform", Value.fromString(value));
  }

  get realId(): BigInt {
    let value = this.get("realId");
    return value!.toBigInt();
  }

  set realId(value: BigInt) {
    this.set("realId", Value.fromBigInt(value));
  }

  get orderId(): BigInt {
    let value = this.get("orderId");
    return value!.toBigInt();
  }

  set orderId(value: BigInt) {
    this.set("orderId", Value.fromBigInt(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get time(): i32 {
    let value = this.get("time");
    return value!.toI32();
  }

  set time(value: i32) {
    this.set("time", Value.fromI32(value));
  }

  get applicationCount(): BigInt {
    let value = this.get("applicationCount");
    return value!.toBigInt();
  }

  set applicationCount(value: BigInt) {
    this.set("applicationCount", Value.fromBigInt(value));
  }

  get applications(): Array<string> | null {
    let value = this.get("applications");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set applications(value: Array<string> | null) {
    if (!value) {
      this.unset("applications");
    } else {
      this.set("applications", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Audit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Audit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Audit must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Audit", id.toString(), this);
    }
  }

  static load(id: string): Audit | null {
    return changetype<Audit | null>(store.get("Audit", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get time(): i32 {
    let value = this.get("time");
    return value!.toI32();
  }

  set time(value: i32) {
    this.set("time", Value.fromI32(value));
  }

  get auditor(): string {
    let value = this.get("auditor");
    return value!.toString();
  }

  set auditor(value: string) {
    this.set("auditor", Value.fromString(value));
  }

  get subtitle(): string {
    let value = this.get("subtitle");
    return value!.toString();
  }

  set subtitle(value: string) {
    this.set("subtitle", Value.fromString(value));
  }

  get attitude(): string {
    let value = this.get("attitude");
    return value!.toString();
  }

  set attitude(value: string) {
    this.set("attitude", Value.fromString(value));
  }
}
