import { useMemo, useState } from "react";
import { I18nContext } from "@/i18n/I18nContext";

const translations = {
  en: {
    language: "Language", closeLanguagePicker: "Close language picker", selected: "Selected", treeDetails: "Tree details", healthy: "Healthy", age: "Age", years: "years", altitude: "Altitude", certified: "Certified",
    overview: "Overview", harvest: "Harvest", careRecords: "Care Records", description: "Description", tasteProfile: "Taste Profile",
    sweet: "Sweet", bitter: "Bitter", creamy: "Creamy", intense: "Intense", texture: "Texture", color: "Color",
    datePlanted: "Date planted", certificateNo: "Certificate No", dateCertified: "Date Certified",
    mygapDescription: "myGAP is a Malaysian certification that ensures farms follow safe, sustainable, and quality agricultural practices.",
    records: "Records", noRecords: "No records just yet!", noRecordsDescription: "The farmer will plant & update soon, stay tuned!", viewMore: "View more", viewLess: "View less",
    noFruits: "No fruits just yet!", noFruitsDescription: "It's still a little sapling growing, stretching, and dreaming of harvest day.", fruit: "fruit", fruits: "fruits", water: "water",
    fertiliser: "Fertilizer", fertilizer: "Fertilizer", pesticide: "Pesticide", fungicide: "Fungicide", foliar: "Foliar Fertilizer", foliarFertilizer: "Foliar Fertilizer", soilDrenching: "Soil Drenching", watering: "Watering", pruning: "Pruning", needsAttention: "Needs Attention", attention: "Needs Attention", markHealthy: "Mark Healthy",
    farm: "Farm", noDescription: "No description available.", denseTexture: "Dense, velvety, and smooth, melting in the mouth like rich butter or custard.",
  },
  ms: {
    language: "Bahasa", closeLanguagePicker: "Tutup pilihan bahasa", selected: "Dipilih", treeDetails: "Maklumat pokok", healthy: "Sihat", age: "Umur", years: "tahun", altitude: "Altitud", certified: "Bertauliah",
    overview: "Gambaran Keseluruhan", harvest: "Hasil Tuai", careRecords: "Rekod Penjagaan", description: "Penerangan", tasteProfile: "Profil Rasa",
    sweet: "Manis", bitter: "Pahit", creamy: "Berkrim", intense: "Intensiti", texture: "Tekstur", color: "Warna",
    datePlanted: "Tarikh ditanam", certificateNo: "No. Sijil", dateCertified: "Tarikh Disijilkan",
    mygapDescription: "myGAP ialah pensijilan Malaysia yang memastikan ladang mengamalkan pertanian yang selamat, mampan dan berkualiti.",
    records: "Rekod", noRecords: "Belum ada rekod!", noRecordsDescription: "Petani akan menanam dan mengemas kini tidak lama lagi. Nantikan!", viewMore: "Lihat lagi", viewLess: "Lihat kurang",
    noFruits: "Belum ada buah!", noFruitsDescription: "Pokok kecil ini sedang membesar dan menanti hari tuaian.", fruit: "biji", fruits: "biji", water: "air",
    fertiliser: "Baja", fertilizer: "Baja", pesticide: "Racun Perosak", fungicide: "Racun Kulat", foliar: "Baja Daun", foliarFertilizer: "Baja Daun", soilDrenching: "Siraman Tanah", watering: "Penyiraman", pruning: "Pemangkasan", needsAttention: "Perlu Perhatian", attention: "Perlu Perhatian", markHealthy: "Pulih Sihat",
    farm: "Ladang", noDescription: "Tiada penerangan tersedia.", denseTexture: "Padat, lembut dan licin, cair di dalam mulut seperti mentega atau kastard.",
  },
  zh: {
    language: "语言", closeLanguagePicker: "关闭语言选择", selected: "已选择", treeDetails: "树木详情", healthy: "健康", age: "树龄", years: "年", altitude: "海拔", certified: "认证",
    overview: "概览", harvest: "收成", careRecords: "护理记录", description: "简介", tasteProfile: "风味特点",
    sweet: "甜", bitter: "苦", creamy: "奶油感", intense: "浓郁度", texture: "口感", color: "颜色",
    datePlanted: "种植日期", certificateNo: "证书编号", dateCertified: "认证日期",
    mygapDescription: "myGAP 是马来西亚认证，确保农场遵循安全、可持续且优质的农业实践。",
    records: "记录", noRecords: "目前还没有记录！", noRecordsDescription: "农户很快会种植并更新记录，敬请期待！", viewMore: "查看更多", viewLess: "收起",
    noFruits: "目前还没有果实！", noFruitsDescription: "小树苗正在生长，期待收获的日子。", fruit: "粒", fruits: "粒", water: "水",
    fertiliser: "施肥", fertilizer: "施肥", pesticide: "杀虫剂", fungicide: "杀菌剂", foliar: "叶面肥", foliarFertilizer: "叶面肥", soilDrenching: "灌根", watering: "浇水", pruning: "修剪", needsAttention: "需要关注", attention: "需要关注", markHealthy: "恢复健康",
    farm: "农场", noDescription: "暂无简介。", denseTexture: "果肉浓郁细腻、柔滑，入口如奶油或卡仕达般绵密。",
  },
};

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem("croptags-language");
    return Object.hasOwn(translations, savedLanguage) ? savedLanguage : "en";
  });

  const value = useMemo(() => ({
    language,
    setLanguage: (nextLanguage) => {
      if (!Object.hasOwn(translations, nextLanguage)) return;
      window.localStorage.setItem("croptags-language", nextLanguage);
      setLanguage(nextLanguage);
    },
    t: (key) => translations[language][key] ?? translations.en[key] ?? key,
    locale: language === "ms" ? "ms-MY" : language === "zh" ? "zh-CN" : "en-MY",
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
