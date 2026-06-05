import type { Opportunity } from "@/data/opportunities";
import ageonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_AgeOn-beec8dc3-a54c-4ddd-8848-26a834c57a4b.png";
import adhiraLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Adhira___appa_coffee_logo_pdf_page-0001-c15e2b95-7a6c-41d8-934e-7b4a2ec2d932.png";
import acerLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Acer-1bd2c7d5-f7dc-4960-ac80-b7484219f27c.png";
import carltonSalonLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Carlton-Salon-logo-a5e9eaed-a622-4862-a749-4bf707ca4d73.png";
import carltonWellnessLogo from "@/assets/brand-carlton-wellness-center.png";
import chhotaBheemLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Chhota_Bheem-dea142f6-259a-4f14-b8ee-797a7da883ac.png";
import daewooLogo from "@/assets/brand-daewoo.png";
import goMillLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Go_Mill-010730c2-0111-42c9-a5d8-247e71589c2b.png";
import natufLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Natuf-d715e02b-db5f-45f3-aeac-324e6ce5dea1.png";
import nativeTouchLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Native_Touch-b15aeaba-99a8-4e5e-8a11-827ba726cfca.png";
import nonstopLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_NonStop-44a96236-884f-40d5-874b-be130a73dfed.png";
import tarzanLogo from "@/assets/c__Users_my_pc_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Tarzan_Original_Logo-41978e5c-8f9a-4a9a-b8ef-40bebcd85735.png";

/** Solid black background — blend to transparent on white cards */
export const darkBackgroundLogoIds = new Set<Opportunity["id"]>(["tarzan"]);

/** Light grey plate background — multiply removes plate on white cards */
export const lightPlateLogoIds = new Set<Opportunity["id"]>(["daewoo", "carlton-wellness"]);

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
  tarzan: tarzanLogo
};
