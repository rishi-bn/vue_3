// FILE: src/stores/project.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import api from '@/services/api'; 

// The interface for a single project in our list
export interface Project {
  projectId: number;
  projectName: string;
  jobNumber: string;
  selectedProjectRoleId: number;
  memberStatus: 'ACTIVE' | 'DEACTIVE'; // Mapped from recordStatus
  projectStatus: 'OPEN' | 'CLOSE';
  isPinned: boolean;
  roleId: number;
  threeDViewer: string;
}

// The interface for the new project payload
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

export interface ProjectPayload {
  projectId?: number; 
  projectName: string;
  jobNumber: string;
  projectStartDate: string;
  projectDueDate: string;
  recordStatus: string;
  companyId: number;
  projectStatus: string; 
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





export const useProjectStore = defineStore('project', () => {
  // --- Store Dependencies ---
  const userStore = useUserStore();
  const appStore = useAppStore();

  // --- STATE ---
  const isLoading = ref(false); 
  const isSwitchingProject = ref(false); 
  const allProjects = ref<Project[]>([]); 
  const activeProjectId = ref<number | null>(null); // Tracks which project is selected

  // --- GETTERS (Computed Properties) ---
  const activeProjects = computed(() =>
    allProjects.value.filter(p => p.projectStatus === 'OPEN').sort((a, b) => (b.isPinned ? 1 : -1))
  );
  const archivedProjects = computed(() => allProjects.value.filter(p => p.projectStatus === 'CLOSE'));
  const selectedProject = computed(() => allProjects.value.find(p => p.projectId === activeProjectId.value) || null);

  // --- ACTIONS ---

  /**
   * Fetches all projects for the user's company.
   */
  async function fetchAllProjects() {
    if (!userStore.user) return; // Guard clause
    isLoading.value = true;
    allProjects.value = [];
    activeProjectId.value = null;
    try {
      const payload = { companyId: userStore.user.parentCompanyId, userId: userStore.user.userId, projectStatus: null };
      const response = await api.post('api/project/list/base-info', payload);
      allProjects.value = response.data;
      console.log("Fetched projects:", response.data);
      console.log("Payload used:", payload);
      // Auto-select the first active project
      if (activeProjects.value.length > 0) {
        await selectProject(activeProjects.value[0], false); // Don't call switch API on initial load
      }
    } catch (error) {
      appStore.showSnackbar('error', 'Failed to fetch projects.');
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Sets a project as active and calls the switch API.
   */
  async function selectProject(project: Project, callSwitchApi = true) {
    if (activeProjectId.value === project.projectId) return; // Don't re-select the same project

    isSwitchingProject.value = true;
    try {
      if (callSwitchApi) {
        console.log(`Calling Switch API for Project ID: ${project.projectId}`);
        // ** YOUR ACTUAL "SWITCH PROJECT" API CALL WOULD GO HERE **
        // await api.post('/user/switch-project', { projectId: project.projectId });
      }
      activeProjectId.value = project.projectId;
      userStore.setUserStatus(project.memberStatus); // Update user status based on the project
      console.log(`Project selected:`, project);

    } catch (error) {
      appStore.showSnackbar('error', 'Failed to switch project.');
    } finally {
      isSwitchingProject.value = false;
    }
  }

  /**
   * Creates a new project, then adds it to the list and selects it.
   */
  async function createProject(payload: ProjectPayload) {
    appStore.setScreenLoader(true);
    try {
      const response = await api.post('api/project', payload);
      console.log("Project created:", response.data);
      
      // Map the detailed response to our simple Project interface
      const newProject: Project = {
        projectId: response.data.projectId,
        projectName: response.data.projectName,
        jobNumber: response.data.jobNumber,
        selectedProjectRoleId: response.data.selectedProjectRoleId,
        memberStatus: response.data.recordStatus, // Mapping recordStatus to memberStatus
        projectStatus: response.data.projectStatus,
        isPinned: false, // New projects are never pinned by default
        roleId: response.data.roleId,
        threeDViewer: response.data.threeDViewer,
      };

      // Add the new project to the beginning of the list
      allProjects.value.unshift(newProject);
      
      // Immediately select the new project
      await selectProject(newProject);
      
      appStore.showSnackbar('success', 'Project created successfully!');
      return response; // Return the full project data for further use if needed
    } catch (error) {
      appStore.showSnackbar('error', 'Failed to create project.');
      return error;
    } finally {
      appStore.setScreenLoader(false);
    }
  }

  /**
   * Deletes a project by its ID, then refreshes the list.
   */
  async function deleteProject(projectId: number) {
    appStore.setScreenLoader(true);
    try {
      await api.delete(`api/project/${projectId}/user/${userStore.user.userId}`);
      appStore.showSnackbar('success', 'Project deleted successfully.');
      // Refresh the entire list to get the new state
      await fetchAllProjects();
    } catch (error) {
      appStore.showSnackbar('error', 'Failed to delete project.');
    } finally {
      appStore.setScreenLoader(false);
    }
  }

  /**
   * Toggles the pin status for a project.
   */
  async function togglePinProject(project: Project) {
    const newPinStatus = !project.isPinned;
    const url = `api/project/${project.projectId}/company/${userStore.user.parentCompanyId}/user/${userStore.user.userId}/projectStatus/${project.projectStatus}/isPinned/${newPinStatus}`;
    
    try {
      await api.get(url);
      // For instant UI feedback, update the local state
      const projectInStore = allProjects.value.find(p => p.projectId === project.projectId);
      if (projectInStore) {
        projectInStore.isPinned = newPinStatus;
      }
      appStore.showSnackbar('success', `Project ${newPinStatus ? 'pinned' : 'unpinned'}.`);
    } catch (error) {
      appStore.showSnackbar('error', 'Failed to update pin status.');
    }
  }

  return { 
    isLoading,
    isSwitchingProject,
    allProjects,
    activeProjectId,
    activeProjects,
    archivedProjects,
    selectedProject,
    fetchAllProjects,
    selectProject,
    createProject,
    deleteProject,
    togglePinProject,
  };
});























// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
// import { useUserStore } from '@/stores/user';
// import { useCommon } from '@/composables/useCommon';
// import api from '@/services/api';

// export interface Project {
//   projectId: number;
//   companyName: string;
//   projectName: string;
//   jobNumber: string;
//   isPinned: boolean;
//   projectStatus: 'OPEN' | 'CLOSE';
//   selectedProjectRoleId: number;
//   memberStatus: 'ACTIVE' | 'DEACTIVE';
// }

// export const useProjectStore = defineStore('project', () => {
//   const userStore = useUserStore();
//   const { catchAlert } = useCommon();

//   // --- State ---
//   const allProjects = ref<Project[]>([]);
//   const activeProjectId = ref<number | null>(null);
//   const isLoading = ref(false);
//   const currentProject = ref<Project | null>(null);

//   // --- Getters (Computed Properties) ---
//   const activeProjects = computed(() => allProjects.value.filter(p => p.projectStatus === 'OPEN').sort((a,b) => (a.isPinned ? -1 : 1)));
//   const archivedProjects = computed(() => allProjects.value.filter(p => p.projectStatus === 'CLOSE'));
//   const selectedProject = computed(() => allProjects.value.find(p => p.projectId === activeProjectId.value) || null);
//   const projectName = computed(() => selectedProject.value?.projectName || '');
//   const jobNumber = computed(() => selectedProject.value?.jobNumber || '');

//   // --- Actions ---
//   function setCurrentProject(project: Project | null) { // <-- ADD THIS FUNCTION
//     currentProject.value = project;
//   }

//   async function fetchAllProjects() {
//     if (!userStore.user?.companyId) {
//     console.log("FetchProjects aborted: No user or company ID is set in the user store.");
//     return;
//     }

//     isLoading.value = true;
//     allProjects.value = [];
//     try {
//       const payload = { companyId: userStore.user.parentCompanyId, userId: userStore.user.userId, projectStatus: null };
      
//       const response = await api.post('api/project/list/base-info', payload);
//       allProjects.value = response.data;
//       // console.log("payload",payload)
//       // console.log("response.data",response.data)
//       // Auto-select the first active project if none is selected
//       if (activeProjects.value.length > 0 && !activeProjectId.value) {
//         await selectProject(activeProjects.value[0]);
//       }
//     } catch (error) {
//       catchAlert(error);
//       console.error("❌ [project.ts] API call failed:", error);
//     } finally {
//       isLoading.value = false;
//     }
//   }

//   async function selectProject(project: Project) {
//     if (activeProjectId.value === project.projectId) return;
//     try {
//       console.log(`Switching global context to Project ID: ${project.projectId}`);
//       // await switchProject({ projectId: project.projectId });
//       activeProjectId.value = project.projectId;
//       // userStore.setUserStatus(project.memberStatus);
//     } catch (error) { console.error("Failed to select project:", error); }
//   }

  

//   return { isLoading,currentProject,setCurrentProject, allProjects, activeProjectId, activeProjects, archivedProjects, selectedProject, projectName, jobNumber, fetchAllProjects, selectProject };
// });