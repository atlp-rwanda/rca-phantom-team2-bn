import i18n from "i18n"

i18n.configure({
    locales: ["en", "fr"],
    directory: "./src/locales",
    defaultLocale: "en",
    register: global,
})

export default i18n