// src/types/project.ts

export interface ProjectType {
  projectTypeId: number;
  projectTypeName: string;
}

export interface ProjectSubType {
  projectSubTypeId: number;
  projectSubTypeName: string;
}

export interface ProjectAddress {
  street: string | null;
  cityId: string | number;
  stateId: string | number;
  countryId: string | number;
  zipCode: string | null;
  customerId: number | null;
}

// The data structure for the form and the API payload
export interface ProjectPayload {
  projectId?: number; // Will exist when editing
  projectName: string;
  jobNumber: string;
  projectStartDate: string;
  projectDueDate: string;
  recordStatus: string;
  companyId: number;
  projectStatus: string; // e.g., 'OPEN', 'ACTIVE'
  userId: number;
  userCompanyName: string;
  projectType: ProjectType | null;
  projectSubType: ProjectSubType | null;
  projectAddress: ProjectAddress;
  projectStakeHolders: Record<string, any>;
  twoDViewer: string;
  threeDViewer: string;
  projectImage: File | string | null;
  
}

// The full response object from the API
export interface ProjectResponse extends ProjectPayload {
    projectId: number;
    projectName: string;
    jobNumber: string;
    selectedProjectRoleId: number; // roleId from baseinfo API
    recordStatus:  string ;  //"ACTIVE";  // memberStatus which is from baseinfo API -- 
    projectStatus: string;     // "OPEN";
    // "isPinned": false, // it is not from the API but it is required for baseinfo and default it will be false
    roleId: number;
    threeDViewer: "VIRTUELE";
}