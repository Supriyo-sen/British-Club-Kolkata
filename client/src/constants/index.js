import Member_icon from "../assets/icons/Member_icon.png";
import Coupon_icon from "../assets/icons/Coupon_icon.png";
import Settings_icon from "../assets/icons/Settings_icon.png";
import Profile_icon from "../assets/icons/Profile_icon.png";

import member from "../assets/icons/member.png";
import dashboard from "../assets/icons/dashboard.png";
import coupone from "../assets/icons/coupone.png";
import settings from "../assets/icons/settings.png";
import profile from "../assets/icons/profile.png";
import member_bold from "../assets/icons/member_bold.png";
import dashboard_bold from "../assets/icons/dashboard_bold.png";
import coupone_bold from "../assets/icons/coupone_bold.png";
import settings_bold from "../assets/icons/settings_bold.png";
import profile_bold from "../assets/icons/profile_bold.png";
import Analytics_icon from "../assets/icons/analytics.png";
export const locations = [
  "/member",
  "/coupon",
  "/profile",
  "/analytics",
  "/settings",
  "/settings/admin",
  "/",
];

export const cardData = [
         {
           img: Member_icon,
           title: "Member",
           subtitle: "Add or remove members",
           position: "justify-self-end",
           posV: "self-end",
           shadow: "hover:shadow-[8px_8px_16px_0px_rgba(252,198,56,0.25)]",
           background: "hover:bg-[#FEF3C7]",
           page: "/member",
         },
         {
           img: Coupon_icon,
           title: "Coupon",
           subtitle: "Issue or recieve coupons",
           position: "justify-self-start",
           posV: "self-end",
           shadow: "hover:shadow-[8px_8px_16px_0px_rgba(229,44,84,0.25)]",
           background: "hover:bg-[#FDA4AF]",
           page: "/coupon",
         },
         {
           img: Analytics_icon,
           title: "Analytics",
           subtitle: "Detailed info. of transactions",
           position: "justify-self-end",
           posV: "self-start",
           shadow: "hover:shadow-[8px_8px_12px_0px_rgba(33,92,221,0.25)]",
           background: "hover:bg-[#BAE6FD]",
           page: "/analytics",
         },
         {
           img: Profile_icon,
           title: "Profile",
           subtitle: "Change your profile settings",
           position: "justify-self-start",
           posV: "self-start",
           shadow: "hover:shadow-[8px_8px_16px_0px_rgba(51,203,107,0.25)]",
           background: "hover:bg-[#BBF7D0]",
           page: "/profile",
         },
         {
           img: Settings_icon,
           title: "Settings",
           subtitle: "Account settings and Logout",
           position: "justify-self-end",
           posV: "self-start",
           shadow: "hover:shadow-[8px_8px_16px_0px_rgba(140,57,214,0.25)]",
           background: "hover:bg-[#D8B4FE]",
           page: "/settings",
         },
       ];

export const sidebarItem1 = [
  {
    icon: dashboard,
    title: "Dashboard",
    iconBold: dashboard_bold,
    page: "/",
  },
  {
    icon: member,
    title: "Member",
    iconBold: member_bold,
    page: "/member",
  },
  {
    icon: coupone,
    title: "Coupon",
    iconBold: coupone_bold,
    page: "/coupon",
  },
  {
    icon: profile,
    title: "Profile",
    iconBold: profile_bold,
    page: "/profile",
  },
  {
    icon: settings,
    title: "Settings",
    iconBold: settings_bold,
    page: "/settings",
  },
];


export const managementData = [
  { id: 1, name: "John Doe", roles: "Admin" },
  { id: 2, name: "Jane Smith", roles: "Operator" },
  { id: 3, name: "Mike Johnson", roles: "Auditor" },
];
