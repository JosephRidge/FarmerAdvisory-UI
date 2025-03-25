"use client";

import * as React from "react";

function IconSend({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#666666"
    >
      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </svg>
  );
}

function IconThumbsUp({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.84 19C3.84 18.7292 3.745 18.4948 3.555 18.2969C3.365 18.099 3.14 18 2.88 18C2.61 18 2.3825 18.099 2.1975 18.2969C2.0125 18.4948 1.92 18.7292 1.92 19C1.92 19.2812 2.0125 19.5182 2.1975 19.7109C2.3825 19.9036 2.61 20 2.88 20C3.14 20 3.365 19.9036 3.555 19.7109C3.745 19.5182 3.84 19.2812 3.84 19ZM6.24 11V21C6.24 21.2708 6.145 21.5052 5.955 21.7031C5.765 21.901 5.54 22 5.28 22H0.96C0.7 22 0.475 21.901 0.285 21.7031C0.095 21.5052 0 21.2708 0 21V11C0 10.7292 0.095 10.4948 0.285 10.2969C0.475 10.099 0.7 10 0.96 10H5.28C5.54 10 5.765 10.099 5.955 10.2969C6.145 10.4948 6.24 10.7292 6.24 11ZM24 11C24 11.8958 23.725 12.6719 23.175 13.3281C23.325 13.7865 23.4 14.1823 23.4 14.5156C23.43 15.3073 23.215 16.0208 22.755 16.6562C22.925 17.2396 22.925 17.849 22.755 18.4844C22.605 19.0781 22.335 19.5677 21.945 19.9531C22.035 21.1198 21.79 22.0625 21.21 22.7812C20.57 23.5729 19.585 23.9792 18.255 24H16.32C15.66 24 14.94 23.9193 14.16 23.7578C13.38 23.5964 12.7725 23.4453 12.3375 23.3047C11.9025 23.1641 11.3 22.9583 10.53 22.6875C9.3 22.2396 8.51 22.0104 8.16 22C7.9 21.9896 7.675 21.888 7.485 21.6953C7.295 21.5026 7.2 21.2708 7.2 21V10.9844C7.2 10.724 7.29 10.4974 7.47 10.3047C7.65 10.112 7.865 10.0052 8.115 9.98438C8.355 9.96354 8.735 9.65625 9.255 9.0625C9.775 8.46875 10.28 7.83854 10.77 7.17188C11.45 6.26562 11.955 5.64062 12.285 5.29688C12.465 5.10938 12.62 4.85938 12.75 4.54688C12.88 4.23438 12.9675 3.98177 13.0125 3.78906C13.0575 3.59635 13.125 3.28125 13.215 2.84375C13.285 2.4375 13.3475 2.11979 13.4025 1.89062C13.4575 1.66146 13.555 1.39062 13.695 1.07812C13.835 0.765625 14.005 0.505208 14.205 0.296875C14.395 0.0989583 14.62 0 14.88 0C15.34 0 15.7525 0.0546875 16.1175 0.164062C16.4825 0.273438 16.7825 0.408854 17.0175 0.570312C17.2525 0.731771 17.4525 0.942708 17.6175 1.20312C17.7825 1.46354 17.9025 1.69792 17.9775 1.90625C18.0525 2.11458 18.1125 2.375 18.1575 2.6875C18.2025 3 18.2275 3.23438 18.2325 3.39062C18.2375 3.54688 18.24 3.75 18.24 4C18.24 4.39583 18.1925 4.79167 18.0975 5.1875C18.0025 5.58333 17.9075 5.89583 17.8125 6.125C17.7175 6.35417 17.58 6.64583 17.4 7C17.37 7.0625 17.32 7.15625 17.25 7.28125C17.18 7.40625 17.125 7.52083 17.085 7.625C17.045 7.72917 17.005 7.85417 16.965 8H21.12C21.9 8 22.575 8.29688 23.145 8.89062C23.715 9.48438 24 10.1875 24 11Z" fill="black" />
    </svg>
  );
}
function IconThumbsDown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.84 5C3.84 5.27083 3.745 5.50521 3.555 5.70312C3.365 5.90104 3.14 6 2.88 6C2.61 6 2.3825 5.90104 2.1975 5.70312C2.0125 5.50521 1.92 5.27083 1.92 5C1.92 4.71875 2.0125 4.48177 2.1975 4.28906C2.3825 4.09635 2.61 4 2.88 4C3.14 4 3.365 4.09635 3.555 4.28906C3.745 4.48177 3.84 4.71875 3.84 5ZM6.24 13V3C6.24 2.72917 6.145 2.49479 5.955 2.29688C5.765 2.09896 5.54 2 5.28 2H0.96C0.7 2 0.475 2.09896 0.285 2.29688C0.095 2.49479 0 2.72917 0 3V13C0 13.2708 0.095 13.5052 0.285 13.7031C0.475 13.901 0.7 14 0.96 14H5.28C5.54 14 5.765 13.901 5.955 13.7031C6.145 13.5052 6.24 13.2708 6.24 13ZM24 13C24 12.1042 23.725 11.3281 23.175 10.6719C23.325 10.2135 23.4 9.81771 23.4 9.48438C23.43 8.69271 23.215 7.97917 22.755 7.34375C22.925 6.76042 22.925 6.15104 22.755 5.51562C22.605 4.92188 22.335 4.43229 21.945 4.04688C22.035 2.88021 21.79 1.9375 21.21 1.21875C20.57 0.427083 19.585 0.0208333 18.255 0H16.32C15.66 0 14.94 0.0807292 14.16 0.242188C13.38 0.403646 12.7725 0.554688 12.3375 0.695312C11.9025 0.835938 11.3 1.04167 10.53 1.3125C9.3 1.76042 8.51 1.98958 8.16 2C7.9 2.01042 7.675 2.11198 7.485 2.30469C7.295 2.4974 7.2 2.72917 7.2 3V13.0156C7.2 13.276 7.29 13.5026 7.47 13.6953C7.65 13.888 7.865 13.9948 8.115 14.0156C8.355 14.0365 8.735 14.3438 9.255 14.9375C9.775 15.5312 10.28 16.1615 10.77 16.8281C11.45 17.7344 11.955 18.3594 12.285 18.7031C12.465 18.8906 12.62 19.1406 12.75 19.4531C12.88 19.7656 12.9675 20.0182 13.0125 20.2109C13.0575 20.4036 13.125 20.7188 13.215 21.1562C13.285 21.5625 13.3475 21.8802 13.4025 22.1094C13.4575 22.3385 13.555 22.6094 13.695 22.9219C13.835 23.2344 14.005 23.4948 14.205 23.7031C14.395 23.901 14.62 24 14.88 24C15.34 24 15.7525 23.9453 16.1175 23.8359C16.4825 23.7266 16.7825 23.5911 17.0175 23.4297C17.2525 23.2682 17.4525 23.0573 17.6175 22.7969C17.7825 22.5365 17.9025 22.3021 17.9775 22.0938C18.0525 21.8854 18.1125 21.625 18.1575 21.3125C18.2025 21 18.2275 20.7656 18.2325 20.6094C18.2375 20.4531 18.24 20.25 18.24 20C18.24 19.6042 18.1925 19.2083 18.0975 18.8125C18.0025 18.4167 17.9075 18.1042 17.8125 17.875C17.7175 17.6458 17.58 17.3542 17.4 17C17.37 16.9375 17.32 16.8438 17.25 16.7188C17.18 16.5938 17.125 16.4792 17.085 16.375C17.045 16.2708 17.005 16.1458 16.965 16H21.12C21.9 16 22.575 15.7031 23.145 15.1094C23.715 14.5156 24 13.8125 24 13Z" fill="black" />
    </svg>
  );
}




export { IconSend, IconThumbsUp, IconThumbsDown };
