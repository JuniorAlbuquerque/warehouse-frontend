export interface SessionData {
    user: {
        user_id: number,
        user_name: string,
        employee_registration: string,
        employee_name: string,
        employee_email: string,
        employee_function_function_id: number,
        employee_profile_profile_id: number,
        employee_plant_plant_id: number,
        plant_name: string,
        employee_department_department_id: number,
        department_name: string,
        department_phone: string,
        
    };
}
interface SessionAction {
    type: string;
    sessionData?: SessionData;
}

const initialState: SessionData = {
    user: {
        user_id: 0,
        user_name: 'nothing',
        employee_registration: 'nothing',
        employee_name: 'nothing',
        employee_email: 'nothing',
        employee_function_function_id: 0,
        employee_profile_profile_id: 0,
        employee_plant_plant_id: 0,
        plant_name: 'nothing',
        employee_department_department_id: 0,
        department_name: 'nothing',
        department_phone: 'nothing',
    }
}

export function setSession(sessionData: SessionData) {
    return {
        type: 'SET_SESSION',
        sessionData,
    }
}

export function unsetSession() {
    return {
        type: 'UNSET_SESSION',
    }
}

export default function reducers (state = initialState, action: SessionAction ): SessionData {
    switch (action.type) {
        case 'SET_SESSION':
            if (action.sessionData) {
                return {
                    ...action.sessionData,
                }
            }else{
                return { ...state}
            }
        case 'UNSET_SESSION':
            return {
                ...initialState,
            }
            
        default:
            return state;
    }
}