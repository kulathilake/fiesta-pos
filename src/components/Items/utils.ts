import { Section } from "@prisma/client";

export function getSectionLabel(section: Section) {
    switch(section){
        case Section.BBQ_N_GRILL:
            return "BBQ & Grill";
        case Section.HOT_KITCHEN:
            return "Hot Kitchen";
        case Section.INDIAN_CUISINE:
            return "Indian Cuisine";
        case Section.JUICE_BAR:
            return "Juice Bar"
    }
}