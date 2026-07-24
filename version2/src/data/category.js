export const Map_Category =  {
    1:"Patient",
    2:"Blood Donor",
    3:"Hospitals",
    4:"Blood Banks",
    5:"Individual Doctor"
}
export const getCategoryLabel = (num) => Map_Category[num] || "Unknown";