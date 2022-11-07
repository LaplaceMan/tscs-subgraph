import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { SubtitleToken, SubtitleUpload, Transfer } from "../../generated/SubtitleToken/SubtitleToken"
import { Subtitle } from "../../generated/schema"
import { getOrCreateUser, getOrCreateLanguage, getOrCreateApplication, getOrCreateDashboard, getOrCreateDayData } from "../subtitle-system"
import { ONE_BI, SUBTITLE_TOKEN } from "../utils"

export const ST = SubtitleToken.bind(Address.fromString(SUBTITLE_TOKEN))

export function handleSubtitleUpload(event: SubtitleUpload): void {
    let subtitle = new Subtitle(event.params.subtitleId.toString())
    subtitle.maker = getOrCreateUser(event.params.maker, event).id
    subtitle.owner = getOrCreateUser(event.params.maker, event).id
    // subtitle.subtitleId = event.params.subtitleId
    subtitle.language = getOrCreateLanguage(event.params.languageId).id
    subtitle.cid = event.params.cid
    subtitle.application = getOrCreateApplication(event.params.applyId, event).id
    subtitle.state = "NORMAL"
    subtitle.fingerprint = event.params.fingerprint
    subtitle.time = event.block.timestamp.toI32()
    let dashboard = getOrCreateDashboard()
    dashboard.subtitleCount.plus(ONE_BI)
    let dayData = getOrCreateDayData(event)
    dayData.subtitleCount.plus(ONE_BI)
    dayData.save()
    dashboard.save()
    subtitle.save()
}

export function handleSTTransfer(event: Transfer): void {
    let subtitle = getOrCreateSubtitle(event.params.tokenId, event)
    subtitle.owner = getOrCreateUser(event.params.to, event).id
    subtitle.save()
}

export function getOrCreateSubtitle(subtitleId: BigInt, event: ethereum.Event): Subtitle {
    let subtitle = Subtitle.load(subtitleId.toString())
    if (subtitle === null) {
        subtitle = new Subtitle(subtitleId.toString())
        let base = ST.try_subtitleNFT(subtitleId)
        subtitle.language = getOrCreateLanguage(base.value.getLanguageId()).id
        subtitle.fingerprint = base.value.getFingerprint()
        subtitle.application = getOrCreateApplication(base.value.getApplyId(), event).id
        subtitle.state = "NORMAL"
        let uri = ST.try_tokenURI(subtitleId)
        subtitle.cid = uri.value
        let owner = ST.try_ownerOf(subtitleId)
        subtitle.maker = getOrCreateUser(owner.value, event).id
        subtitle.owner = getOrCreateUser(owner.value, event).id
        let dashboard = getOrCreateDashboard()
        dashboard.subtitleCount.plus(ONE_BI)
        subtitle.save()
    }
    return subtitle
}