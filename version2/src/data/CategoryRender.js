import {lazy} from "react";
export const Dashboard_Renders = {
    1: lazy(()=> import('../Dashboards/User')),
    2: lazy(()=> import('../Dashboards/Blood_donor')),
    3: lazy(()=> import ('../Dashboards/Hospitals')),
    4: lazy(()=> import ('../Dashboards/Blood_banks')),
    5: lazy(()=> import ('../Dashboards/Doctors')),
}