import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { SubtitleToken, SubtitleUpload, Transfer } from "../../generated/SubtitleToken/SubtitleToken"
import { Subtitle } from "../../generated/schema"
import { getOrCreateUser, getOrCreateLanguage, getOrCreateApplication, getOrCreateDashboard, getOrCreateDayData } from "../subtitle-system"
import { ONE_BI, SUBTITLE_TOKEN } from "../utils"

export const ST = SubtitleToken.bind(Address.fromString(SUBTITLE_TOKEN))

export function handleSubtitleUpload(event: SubtitleUpload): void {
    let subtitle = new Subtitle(event.params.subtitleId.toString())
    let maker = getOrCreateUser(event.params.maker, event)
    let application = getOrCreateApplication(event.params.applyId, event)
    maker.subtitleNumber.plus(ONE_BI)
    application.subtitleNumber.plus(ONE_BI)
    subtitle.maker = maker.id
    subtitle.owner = getOrCreateUser(event.params.maker, event).id
    // subtitle.subtitleId = event.params.subtitleId
    subtitle.language = getOrCreateLanguage(event.params.languageId).id
    subtitle.cid = event.params.cid
    subtitle.application = application.id
    subtitle.state = "NORMAL"
    subtitle.fingerprint = event.params.fingerprint
    subtitle.time = event.block.timestamp.toI32()
    let dashboard = getOrCreateDashboard()
    dashboard.subtitleCount.plus(ONE_BI)
    let dayData = getOrCreateDayData(event)
    dayData.subtitleCount.plus(ONE_BI)
    maker.save()
    dayData.save()
    dashboard.save()
    subtitle.save()
    application.save()
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
        let application = getOrCreateApplication(base.value.getApplyId(), event)
        subtitle.application = application.id
        application.subtitleNumber.plus(ONE_BI)
        subtitle.state = "NORMAL"
        let uri = ST.try_tokenURI(subtitleId)
        subtitle.cid = uri.value
        let owner = ST.try_ownerOf(subtitleId)
        let maker = getOrCreateUser(owner.value, event)
        subtitle.maker = maker.id
        maker.subtitleNumber.plus(ONE_BI)
        subtitle.owner = getOrCreateUser(owner.value, event).id
        let dashboard = getOrCreateDashboard()
        dashboard.subtitleCount.plus(ONE_BI)
        subtitle.save()
        application.save()
        maker.save()
    }
    return subtitle
}