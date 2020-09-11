import * as planActions from '../actions/plans';

// TODO: this part of the data (plan version) needs to be clarified
async function getPlanDayData(plan, challenge) {
    const planID = plan._id || challenge.PlanID;

    const planData = await planActions.getPlanTasks(planID);
    if (planData.planTypeData.length === 0) {
        return [];
    }

    // TODO: is it okay to assume it's the first one? need to test with plan with 2 versions
    //       there needs to be an default version property or something
    const versionData = planData.planTypeData[0];
    if (!versionData || !versionData.versionData || versionData.versionData.length === 0) {
        return [];
    }

    const dayData = versionData.versionData[0].planVersionDayTaskData;
    return dayData;
}

function getDayData(dayData, currentDay) {
    const day = dayData.find((day) => parseInt(day.versionDay) === currentDay);
    if (!day) {
        return {};
    }

    return day;
}

export { getPlanDayData, getDayData }
