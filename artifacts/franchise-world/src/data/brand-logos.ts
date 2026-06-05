import type { Opportunity } from "@/data/opportunities";

import acerLogo from "@/assets/brand-acer.jpg";
import adhiraLogo from "@/assets/brand-adhira-appa.jpg";
import ageonLogo from "@/assets/brand-ageon.jpg";
import chhotaBheemLogo from "@/assets/brand-chhota-bheem.jpg";
import daewooLogo from "@/assets/brand-daewoo.png";
import goMillLogo from "@/assets/brand-go-mill.jpg";
import hardRockLogo from "@/assets/brand-hardrock.jpg";
import nativeTouchLogo from "@/assets/brand-native-touch.jpg";
import natufLogo from "@/assets/brand-natuf.jpg";
import nonstopLogo from "@/assets/brand-nonstop.jpg";
import tarzanLogo from "@/assets/brand-tarzan.png";
import carltonSalonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Carlton-Salon-logo-a5e9eaed-a622-4862-a749-4bf707ca4d73.png";
import carltonWellnessLogo from "@/assets/brand-carlton-wellness-center.png";

/** Logos that have a dark/black background — render on a dark card */
export const darkCardLogoIds = new Set<Opportunity["id"]>(["daewoo"]);

export const opportunityLogos: Partial<Record<Opportunity["id"], string>> = {
  "adhira-appa": adhiraLogo,
  natuf: natufLogo,
  "go-mill": goMillLogo,
  "pro-mill": nativeTouchLogo,
  "acer-electric": acerLogo,
  "carlton-salon": carltonSalonLogo,
  "carlton-wellness": carltonWellnessLogo,
  "nonstop-physio": nonstopLogo,
  ageon: ageonLogo,
  daewoo: daewooLogo,
  "chhota-bheem": chhotaBheemLogo,
  tarzan: tarzanLogo,
  hardrock: hardRockLogo
};
