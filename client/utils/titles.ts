import { Address } from "../types/address"

export const dokTitles = [
    "mudr", "mddr", "mvdr", "phdr", "judr", "rndr",
    "pharmdr", "thdr", "ph.d", "phd", "th.d", "thd"
]
export const docTitles = ["doc"]
export const profTitles = ["prof"]
export const magTitles = ["mudr", "mddr", "mvdr", "mgr", "mga"]
export const ingTitles = ["ing", "ing.a", "ing. arch", "ing arch", "ing.arch"]
export const bakTitles = ["bc", "bca", "bc.a"]
export const titleGroups = [{
    dict: docTitles,
    male: "docente",
    female: "docentko",
}, {
    dict: profTitles,
    male: "profesore",
    female: "profesorko",
}, {
    dict: dokTitles,
    male: "doktore",
    female: "doktorko",
}, {
    dict: magTitles,
    male: "magistře",
    female: "magistro",
}, {
    dict: ingTitles,
    male: "inženýre",
    female: "inženýrko",
}, {
    dict: bakTitles,
    male: "bakaláři",
    female: "bakalářko",
}]

export const normalizeTitle = (titleInFront?: string, titleBehind?: string): string => {
    return ((titleInFront || "").concat(titleBehind || "")).toLowerCase()
}

export const titleToSalutation = (address: Address): string => {
    const title = normalizeTitle(address.titleInFront, address.titleBehind)
    if(title.length === 0) return address.sex === "male" ? "pane" : "paní"
    let res = ""
    titleGroups.forEach(group => {
        group.dict.forEach(t => {
            if(!res && title.includes(t))
                res = address.sex === "male" ? group.male : group.female
        })
    })
    if(res && res.length > 0) return res;
    return address.sex === "male" ? "pane" : "paní"
}
