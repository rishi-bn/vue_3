import mitt from 'mitt';

// Type definitions for event payloads
interface UpdateProjectPayload {
  data: { projectName: string; jobNumber: string };
  pId: number;
  type: number;
}
interface ProjectPayload {
  projectId: number;
  projectName: string;
  jobNumber: string;
}

// The complete map of events for this feature
type Events = {
  'viewsnackbar': [type: string, message: string];
  'toggleScreenLoader': boolean;
  'open-project-form': [cid: number, title: string];
  'update-project-setup': void;
  'reload-tabs': void;
  'Update Project': UpdateProjectPayload;
  'updateProfileImage': string;
  'addToProjectList': any;
  'trigger-parallel-login-alert' : boolean;
  'updateProjectList': UpdateProjectPayload;
  'view-selected-project-details': [project: ProjectPayload, companyId: number | undefined];
};

export const emitter = mitt<Events>();