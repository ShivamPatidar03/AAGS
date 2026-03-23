import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";

type Translations = {
  [key: string]: { en: string; hi: string };
};

const t: Translations = {
  // Navbar
  "nav.home": { en: "Home", hi: "होम" },
  "nav.features": { en: "Features", hi: "फीचर्स" },
  "nav.howItWorks": { en: "How It Works", hi: "यह कैसे काम करता है" },
  "nav.cropInsights": { en: "Crop Insights", hi: "फसल की जानकारी" },
  "nav.dashboard": { en: "Forecast Dashboard", hi: "अनुमान डैशबोर्ड" },
  "nav.marketTrends": { en: "Market Trends", hi: "मंडी का रुझान" },
  "nav.about": { en: "About", hi: "हमारे बारे में" },
  "nav.contact": { en: "Contact", hi: "संपर्क करें" },
  "nav.startPrediction": { en: "Start Prediction", hi: "अंदाजा लगाएं" },

  // Hero
  "hero.badge": { en: "AAGS: Agentic Agroautonomous Greenhouse System", hi: "AAGS: स्मार्ट ग्रीनहाउस खेती सिस्टम" },
  "hero.title1": { en: "AI Powered Crop", hi: "AI से जानें फसल का" },
  "hero.title2": { en: "Profit Intelligence", hi: "मुनाफा" },
  "hero.subtitle": { en: "Predict mandi price, estimate yield, and calculate profit using machine learning and agronomy insights for greenhouse farming.", hi: "ग्रीनहाउस खेती के लिए मंडी का दाम, फसल की पैदावार और मुनाफे का अंदाजा लगाएं — AI और खेती के तरीकों की मदद से।" },
  "hero.startPrediction": { en: "Start Prediction", hi: "अंदाजा लगाएं" },
  "hero.exploreForecast": { en: "Explore Forecast", hi: "अनुमान देखें" },
  "hero.cropsSupported": { en: "Crops Supported", hi: "फसलें उपलब्ध" },
  "hero.multiSoil": { en: "Multi Soil Analysis", hi: "कई मिट्टी की जांच" },
  "hero.instantForecast": { en: "Instant Forecast", hi: "तुरंत अनुमान" },
  "hero.mandiPrice": { en: "Mandi Price", hi: "मंडी का दाम" },
  "hero.yield": { en: "Yield", hi: "पैदावार" },
  "hero.revenue": { en: "Revenue", hi: "कुल कमाई" },
  "hero.profit": { en: "Profit", hi: "मुनाफा" },
  "hero.profitStatus": { en: "Profit Status", hi: "मुनाफे की स्थिति" },
  "hero.growth": { en: "+34% Growth", hi: "+34% बढ़त" },

  // Logo strip
  "logo.title": { en: "Trusted Agricultural Intelligence System", hi: "भरोसेमंद खेती का स्मार्ट सिस्टम" },

  // Features
  "features.badge": { en: "Features", hi: "फीचर्स" },
  "features.title1": { en: "Everything You Need to", hi: "अच्छे अनुमान के लिए" },
  "features.title2": { en: "Forecast Smarter", hi: "सब कुछ यहाँ है" },
  "features.subtitle": { en: "From price prediction to profit estimation — all powered by machine learning and agronomy science.", hi: "दाम के अंदाजे से लेकर मुनाफे का हिसाब — सब AI और खेती की समझ से।" },
  "features.f1.title": { en: "Mandi Price Prediction", hi: "मंडी के दाम का अंदाजा" },
  "features.f1.desc": { en: "ML-based price forecasting using historical mandi data and seasonal patterns.", hi: "पुराने मंडी के दामों और मौसम के हिसाब से AI दाम बताता है।" },
  "features.f2.title": { en: "Yield Estimation", hi: "पैदावार का अनुमान" },
  "features.f2.desc": { en: "Predict crop output based on soil type, season, and cultivation area.", hi: "मिट्टी, मौसम और जमीन के हिसाब से फसल कितनी होगी — यह बताता है।" },
  "features.f3.title": { en: "Cost & Profit Forecast", hi: "खर्च और मुनाफे का हिसाब" },
  "features.f3.desc": { en: "Full financial breakdown including cost, revenue, and net profit.", hi: "कितना खर्च होगा, कितनी कमाई होगी और कितना मुनाफा — सब एक जगह।" },
  "features.f4.title": { en: "Annual Profit Planning", hi: "साल भर के मुनाफे की योजना" },
  "features.f4.desc": { en: "Analyze yearly profit potential across multiple crop cycles.", hi: "पूरे साल में अलग-अलग फसलों से कितना मुनाफा हो सकता है, यह जानें।" },
  "features.f5.title": { en: "Smart Farmer Dashboard", hi: "किसान का स्मार्ट डैशबोर्ड" },
  "features.f5.desc": { en: "Interactive analytics dashboard with charts and insights.", hi: "चार्ट और सलाह के साथ आसान डैशबोर्ड — सब कुछ एक नजर में।" },
  "features.f6.title": { en: "Market Trend Insights", hi: "बाजार के दाम का रुझान" },
  "features.f6.desc": { en: "Understand seasonal demand and market fluctuations.", hi: "मौसम के हिसाब से मंडी में दाम कैसे बदलते हैं, यह समझें।" },

  // How it works
  "hiw.badge": { en: "How it Works", hi: "यह कैसे काम करता है" },
  "hiw.title1": { en: "Four Simple Steps to", hi: "अनुमान लगाने के" },
  "hiw.title2": { en: "Your Forecast", hi: "4 आसान कदम" },
  "hiw.s1.title": { en: "Select Crop & Season", hi: "फसल और मौसम चुनें" },
  "hiw.s1.desc": { en: "Choose from Tomato, Capsicum, Cucumber, Watermelon, or Cabbage and select the growing season.", hi: "टमाटर, शिमला मिर्च, खीरा, तरबूज या पत्तागोभी में से फसल चुनें और मौसम बताएं।" },
  "hiw.s2.title": { en: "Enter Soil Type & Area", hi: "मिट्टी और जमीन का क्षेत्र बताएं" },
  "hiw.s2.desc": { en: "Provide your soil type (Sandy, Clay, Loamy, Red, Black) and cultivation area in sqm.", hi: "अपनी मिट्टी का प्रकार (रेतीली, चिकनी, दोमट, लाल, काली) और खेत का क्षेत्र (वर्ग मीटर में) डालें।" },
  "hiw.s3.title": { en: "AI Predicts Price & Yield", hi: "AI दाम और पैदावार बताता है" },
  "hiw.s3.desc": { en: "Our ML model forecasts the mandi price per kg and expected yield for your inputs.", hi: "हमारा AI आपकी जानकारी के हिसाब से मंडी का दाम और फसल की पैदावार का अंदाजा लगाता है।" },
  "hiw.s4.title": { en: "View Profit Forecast", hi: "मुनाफे का अनुमान देखें" },
  "hiw.s4.desc": { en: "See a full cost-revenue breakdown with profit insights and recommendations.", hi: "खर्च, कमाई और मुनाफे का पूरा हिसाब देखें — साथ में AI की सलाह भी।" },

  // Crop Insights
  "ci.badge": { en: "Crop Insights", hi: "फसल की जानकारी" },
  "ci.title1": { en: "Supported", hi: "उपलब्ध" },
  "ci.title2": { en: "Crops", hi: "फसलें" },
  "ci.subtitle": { en: "Detailed intelligence for greenhouse crops we support.", hi: "ग्रीनहाउस की उन फसलों की पूरी जानकारी जो हम सपोर्ट करते हैं।" },
  "ci.typicalYield": { en: "Typical Yield", hi: "आम पैदावार" },
  "ci.marketPrice": { en: "Market Price", hi: "बाजार का दाम" },
  "ci.bestSeason": { en: "Best Season", hi: "सबसे अच्छा मौसम" },

  // Dashboard
  "dash.badge": { en: "Forecast Dashboard", hi: "अनुमान डैशबोर्ड" },
  "dash.title1": { en: "Predict Your", hi: "अपनी फसल का" },
  "dash.title2": { en: "Crop Profit", hi: "मुनाफा जानें" },
  "dash.subtitle": { en: "Enter your crop parameters and get instant AI-powered profit forecasts.", hi: "अपनी फसल की जानकारी भरें और तुरंत AI से मुनाफे का अंदाजा पाएं।" },
  "dash.inputParams": { en: "Input Parameters", hi: "जानकारी भरें" },
  "dash.cropName": { en: "Crop Name", hi: "फसल का नाम" },
  "dash.season": { en: "Season", hi: "मौसम" },
  "dash.soilType": { en: "Soil Type", hi: "मिट्टी का प्रकार" },
  "dash.area": { en: "Area (sqm)", hi: "जमीन का क्षेत्र (वर्ग मीटर)" },
  "dash.enterArea": { en: "Enter area", hi: "क्षेत्र डालें" },
  "dash.month": { en: "Month", hi: "महीना" },
  "dash.currentMonth": { en: "Current month", hi: "इस महीने का" },
  "dash.predictNow": { en: "Predict Now", hi: "अभी अंदाजा लगाएं" },
  "dash.running": { en: "Running forecast…", hi: "अनुमान लगा रहे हैं…" },
  "dash.analyzing": { en: "Analyzing market data & agronomy factors", hi: "मंडी के दाम और खेती की जानकारी जांच रहे हैं" },
  "dash.readyTitle": { en: "Ready to Predict", hi: "अंदाजा लगाने के लिए तैयार" },
  "dash.readyDesc": { en: "Fill in your crop details and hit \"Predict Now\" to see your AI-powered forecast.", hi: "अपनी फसल की जानकारी भरें और \"अभी अंदाजा लगाएं\" दबाएं।" },
  "dash.mandiPrice": { en: "Mandi Price", hi: "मंडी का दाम" },
  "dash.expectedYield": { en: "Expected Yield", hi: "अनुमानित पैदावार" },
  "dash.estimatedCost": { en: "Estimated Cost", hi: "कुल खर्च" },
  "dash.revenue": { en: "Revenue", hi: "कुल कमाई" },
  "dash.profit": { en: "Profit", hi: "मुनाफा" },
  "dash.status": { en: "Status", hi: "स्थिति" },
  "dash.profitable": { en: "Profitable", hi: "मुनाफे में" },
  "dash.breakeven": { en: "Break-even", hi: "बराबरी पर" },
  "dash.lossRisk": { en: "Loss Risk", hi: "नुकसान का खतरा" },
  "dash.profitBreakdown": { en: "Profit Breakdown", hi: "मुनाफा और खर्च का हिसाब" },
  "dash.forecastSummary": { en: "Forecast Summary", hi: "अनुमान का सार" },
  "dash.priceTrend": { en: "Price Trend (Last 90 Days)", hi: "दाम का रुझान (पिछले 90 दिन)" },
  "dash.avgBySeason": { en: "Average Price by Season", hi: "मौसम के हिसाब से औसत दाम" },
  "dash.costVsRevenue": { en: "Cost vs Revenue", hi: "खर्च बनाम कमाई" },
  "dash.soilImpact": { en: "Soil Impact on Profit", hi: "मिट्टी का मुनाफे पर असर" },
  "dash.aiInsights": { en: "AI Insights", hi: "AI की सलाह" },
  "dash.areaError": { en: "Area must be greater than 0", hi: "जमीन का क्षेत्र 0 से ज्यादा होना चाहिए" },
  "dash.cost": { en: "Cost", hi: "खर्च" },

  // Soils
  "soil.Sandy": { en: "Sandy", hi: "रेतीली" },
  "soil.Clay": { en: "Clay", hi: "चिकनी" },
  "soil.Loamy": { en: "Loamy", hi: "दोमट" },
  "soil.Red": { en: "Red", hi: "लाल" },
  "soil.Black": { en: "Black", hi: "काली" },

  // Seasons
  "season.Summer": { en: "Summer", hi: "गर्मी" },
  "season.Winter": { en: "Winter", hi: "सर्दी" },
  "season.Monsoon": { en: "Monsoon", hi: "बारिश" },

  // Crops
  "crop.Tomato": { en: "Tomato", hi: "टमाटर" },
  "crop.Capsicum": { en: "Capsicum", hi: "शिमला मिर्च" },
  "crop.Cucumber": { en: "Cucumber", hi: "खीरा" },
  "crop.Watermelon": { en: "Watermelon", hi: "तरबूज" },
  "crop.Cabbage": { en: "Cabbage", hi: "पत्तागोभी" },

  // History
  "hist.badge": { en: "History", hi: "पिछला रिकॉर्ड" },
  "hist.title1": { en: "Past", hi: "पिछले" },
  "hist.title2": { en: "Predictions", hi: "अनुमान" },
  "hist.search": { en: "Search...", hi: "खोजें..." },
  "hist.export": { en: "Export", hi: "डाउनलोड करें" },
  "hist.date": { en: "Date", hi: "तारीख" },
  "hist.crop": { en: "Crop", hi: "फसल" },
  "hist.season": { en: "Season", hi: "मौसम" },
  "hist.area": { en: "Area (sqm)", hi: "जमीन (वर्ग मीटर)" },
  "hist.profit": { en: "Profit (₹)", hi: "मुनाफा (₹)" },
  "hist.status": { en: "Status", hi: "स्थिति" },
  "hist.all": { en: "All", hi: "सभी" },
  "hist.noResults": { en: "No predictions found", hi: "कोई अनुमान नहीं मिला" },

  // Market Trends
  "mt.badge": { en: "Market Intelligence", hi: "मंडी की जानकारी" },
  "mt.title1": { en: "Market", hi: "मंडी के दाम" },
  "mt.title2": { en: "Trends & Analysis", hi: "और रुझान" },
  "mt.subtitle": { en: "Understand seasonal demand, price trends, and compare crop profitability.", hi: "मौसम के हिसाब से मांग, दामों का रुझान और फसलों के मुनाफे की तुलना समझें।" },
  "mt.priceTrend": { en: "Price Trend (₹/kg)", hi: "दाम का रुझान (₹/किलो)" },
  "mt.seasonalDemand": { en: "Seasonal Demand Index", hi: "मौसम के हिसाब से मांग" },
  "mt.cropComparison": { en: "Crop Comparison", hi: "फसलों की तुलना" },

  // About
  "about.badge": { en: "About AAGS", hi: "AAGS के बारे में" },
  "about.title1": { en: "Empowering Farmers with", hi: "किसानों की मदद" },
  "about.title2": { en: "AI Intelligence", hi: "AI से" },
  "about.p1": { en: "AAGS (Agentic Agroautonomous Greenhouse System) is an AI-powered platform that helps greenhouse farmers make data-driven decisions about crop selection, pricing, and profit optimization.", hi: "AAGS एक AI वाला सिस्टम है जो ग्रीनहाउस किसानों को फसल चुनने, दाम समझने और मुनाफा बढ़ाने में मदद करता है।" },
  "about.p2": { en: "By combining machine learning models with agronomy science, we forecast mandi prices, estimate yields, and provide actionable profit insights — helping farmers reduce risk and maximize returns.", hi: "AI और खेती की समझ को मिलाकर, हम मंडी के दामों का अंदाजा लगाते हैं, पैदावार बताते हैं और मुनाफा बढ़ाने की सलाह देते हैं — ताकि किसानों का नुकसान कम हो और कमाई ज्यादा।" },
  "about.b1": { en: "AI + Agronomy", hi: "AI + खेती" },
  "about.b2": { en: "5 Greenhouse Crops", hi: "5 ग्रीनहाउस फसलें" },
  "about.b3": { en: "Real-time Forecasting", hi: "तुरंत अनुमान" },

  // Footer
  "footer.desc": { en: "Agentic Agroautonomous Greenhouse System — AI-powered crop profit intelligence for modern farmers.", hi: "AAGS — किसानों के लिए AI से फसल का मुनाफा जानने का स्मार्ट तरीका।" },
  "footer.platform": { en: "Platform", hi: "प्लेटफॉर्म" },
  "footer.resources": { en: "Resources", hi: "जानकारी" },
  "footer.stayUpdated": { en: "Stay Updated", hi: "अपडेट पाएं" },
  "footer.newsletter": { en: "Get the latest crop market insights delivered to your inbox.", hi: "मंडी और फसल की ताजा जानकारी सीधे अपने ईमेल पर पाएं।" },
  "footer.copyright": { en: "Made with 🌱 for farmers · AAGS Forecast Dashboard © 2026", hi: "किसानों के लिए 🌱 बनाया गया · AAGS अनुमान डैशबोर्ड © 2026" },
  "footer.privacy": { en: "Privacy", hi: "प्राइवेसी" },
  "footer.terms": { en: "Terms", hi: "शर्तें" },

  // Loading screen
  "loading.text": { en: "Loading...", hi: "लोड हो रहा है..." },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  tr: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const tr = (key: string) => t[key]?.[lang] || t[key]?.en || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
