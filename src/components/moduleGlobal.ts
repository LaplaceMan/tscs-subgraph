import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
  MurmesSetCurrencyIsWhitelisted,
  MurmesSetAuditModuleIsWhitelisted,
  MurmesSetDetectionModuleIsWhitelisted,
} from "../../generated/ModuleGlobal/Events";
import {
  WhitelistedToken,
  WhitelistedAuditModule,
  WhitelistedDetectionModule,
} from "../../generated/schema";
import { ERC20 } from "../../generated/Murmes/ERC20";
import { ModuleName } from "../../generated/Murmes/ModuleName";
import { store } from "@graphprotocol/graph-ts";

export function handleMurmesSetCurrencyIsWhitelisted(
  event: MurmesSetCurrencyIsWhitelisted
): void {
  if (event.params.result == true) {
    let token = new WhitelistedToken(event.params.token.toHexString());
    const ERC20Contract = ERC20.bind(Address.fromBytes(event.params.token));
    let name = ERC20Contract.try_name();
    if (!name.reverted) {
      token.name = name.value;
    } else {
      token.name = "PT";
    }

    let symbol = ERC20Contract.try_symbol();
    if (!symbol.reverted) {
      token.symbol = symbol.value;
    } else {
      token.symbol = "PT";
    }

    let decimals = ERC20Contract.try_decimals();
    if (!decimals.reverted) {
      token.decimal = decimals.value;
    } else {
      token.decimal = 6;
    }

    token.save();
  } else {
    store.remove("WhitelistedToken", event.params.token.toHexString());
  }
}

export function handleMurmesSetAuditModuleIsWhitelisted(
  event: MurmesSetAuditModuleIsWhitelisted
): void {
  if (event.params.result == true) {
    let auditModule = new WhitelistedAuditModule(
      event.params.module.toHexString()
    );
    const ModuleContract = ModuleName.bind(
      Address.fromBytes(event.params.module)
    );
    let name = ModuleContract.try_name();
    if (!name.reverted) {
      auditModule.name = name.value;
    } else {
      auditModule.name = "NONE";
    }
    auditModule.save();
  } else {
    store.remove("WhitelistedAuditModule", event.params.module.toHexString());
  }
}

export function handleMurmesSetDetectionModuleIsWhitelisted(
  event: MurmesSetDetectionModuleIsWhitelisted
): void {
  if (event.params.result == true) {
    let detectionModule = new WhitelistedDetectionModule(
      event.params.module.toHexString()
    );
    const ModuleContract = ModuleName.bind(
      Address.fromBytes(event.params.module)
    );
    let name = ModuleContract.try_name();
    if (!name.reverted) {
      detectionModule.name = name.value;
    } else {
      detectionModule.name = "NONE";
    }
    detectionModule.save();
  } else {
    store.remove(
      "WhitelistedDetectionModule",
      event.params.module.toHexString()
    );
  }
}

export function getOrCreateWhitelistedToken(token: Bytes): WhitelistedToken {
  let erc20Token = WhitelistedToken.load(token.toHexString());
  if (erc20Token == null) {
    erc20Token = new WhitelistedToken(token.toHexString());
    const ERC20Contract = ERC20.bind(Address.fromBytes(token));
    let name = ERC20Contract.try_name();
    if (!name.reverted) {
      erc20Token.name = name.value;
    } else {
      erc20Token.name = "PT";
    }

    let symbol = ERC20Contract.try_symbol();
    if (!symbol.reverted) {
      erc20Token.symbol = symbol.value;
    } else {
      erc20Token.symbol = "PT";
    }

    let decimals = ERC20Contract.try_decimals();
    if (!decimals.reverted) {
      erc20Token.decimal = decimals.value;
    } else {
      erc20Token.decimal = 6;
    }

    erc20Token.save();
  }
  return erc20Token;
}

export function getOrCreateWhitelistedAuditModule(
  module: Bytes
): WhitelistedAuditModule {
  let auditModule = WhitelistedAuditModule.load(module.toHexString());
  if (auditModule == null) {
    auditModule = new WhitelistedAuditModule(module.toHexString());
    const ModuleContract = ModuleName.bind(Address.fromBytes(module));
    let name = ModuleContract.try_name();
    if (!name.reverted) {
      auditModule.name = name.value;
    } else {
      auditModule.name = "NONE";
    }
    auditModule.save();
  }
  return auditModule;
}

export function getOrCreateWhitelistedDetectionModule(
  module: Bytes
): WhitelistedDetectionModule {
  let detectionModule = WhitelistedDetectionModule.load(module.toHexString());
  if (detectionModule == null) {
    detectionModule = new WhitelistedDetectionModule(module.toHexString());
    const ModuleContract = ModuleName.bind(Address.fromBytes(module));
    let name = ModuleContract.try_name();
    if (!name.reverted) {
      detectionModule.name = name.value;
    } else {
      detectionModule.name = "NONE";
    }
    detectionModule.save();
  }
  return detectionModule;
}
