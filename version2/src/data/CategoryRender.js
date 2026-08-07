import {lazy} from "react";
export const Dashboard_Renders = {
    1: lazy(()=> import('../Dashboards/User_dashboard/Patient')),
    2: lazy(()=> import('../Dashboards/Blood_donor dashboard/Blood_donor')),
    3: lazy(()=> import ('../Dashboards/Hospital dashboard/Hospitals')),
    4: lazy(()=> import ('../Dashboards/Blood_bank dashboard/Blood_banks')),
    5: lazy(()=> import ('../Dashboards/Doctor dashboard/Doctors')),
}