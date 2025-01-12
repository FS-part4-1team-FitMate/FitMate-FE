export const EMAIL_REGEX = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

export const PWD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const PHONE_REGEX = /^\d{3}-?\d{3,4}-?\d{4}$/;

export const profile_menu = "flex flex-col items-start gap-[12px]";
export const note_class = "text-sm text-slate-500";
export const error_class = "text-red-400 text-sm";
export const active_class = "font-semibold";
