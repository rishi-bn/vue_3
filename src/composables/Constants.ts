// FILE: src/constants/permissions.ts

/**
 * All permission strings used throughout the application.
 * These are used to check user roles and grant access to features.
 */

// --- Project Directory ---
export const projectViewConstant = "projectDirectory:projects";
export const projectCreateConstant = "projectDirectory:projects:createProject";
export const projectEditConstant = "projectDirectory:projects:editProject";
export const projectDeleteConstant = "projectDirectory:projects:deleteProject";

// Project Modules
export const projectModuleView = "projectDirectory:modules";
export const projectActivateModule = "projectDirectory:modules:activateDeactivateModules";
export const projectLinkBimModule = "projectDirectory:modules:linkBim360Project";
export const projectLinkProcureModule = "projectDirectory:modules:linkProcoreProject";

// Project Roles
export const projectRolesView = "projectDirectory:roles";
export const projectRolesModify = "projectDirectory:roles:modifyRoles";

// Project Team
export const projectTeamView = "projectDirectory:team";
export const projectAddTeam = "projectDirectory:team:add";
export const projectEditTeam = "projectDirectory:team:edit";
export const projectInviteTeam = "projectDirectory:team:invite";
export const projectRemoveTeam = "projectDirectory:team:remove";
export const projectViewTeam = "projectDirectory:team:viewProfile";
export const ProjectDirectoryActiveDeactive = "projectDirectory:team:activateDeactivateTeamMember";

// Project Documents
export const projectDocsView = "projectDirectory:documents";
export const projectDocumentAddFolder = "projectDirectory:documents:addFolder";
export const projectDocumentCopyPaste = "projectDirectory:documents:copyPaste";
export const projectDocumentDelete = "projectDirectory:documents:delete";
export const projectDocumentDownload = "projectDirectory:documents:download";
export const projectDocumentHistory = "projectDirectory:documents:history";
export const projectDocumentMarkups = "projectDirectory:documents:markUps";
export const projectDocumentPermission = "projectDirectory:documents:setPermissionsNotifications";
export const projectDocumentRename = "projectDirectory:documents:rename";
export const projectDocumentShare = "projectDirectory:documents:share";
export const projectDocumentUpload = "projectDirectory:documents:upload";
export const projectDocumentVersions = "projectDirectory:documents:versions";
export const projectDocumentView = "projectDirectory:documents:viewDocument";
export const projectDocumentMove = "projectDirectory:documents:move";
export const projectDocumentCustomRevisions = "projectDirectory:documents:manageCustomRevisionsTags";
export const projectDocumentsShareLogView = "projectDirectory:documents:viewShareLog";

// Project Model Setup
export const projectMSView = "projectDirectory:3dModelSetup";
export const projectMSAddModel = "projectDirectory:3dModelSetup:extractModel";
export const projectMSDeleteModel = "projectDirectory:3dModelSetup:deleteModel";
export const projectMSAddShop = "projectDirectory:3dModelSetup:selectShopStandards";
export const projectMSNotes = "projectDirectory:3dModelSetup:notes";
export const projectMSModule = "projectDirectory:3dModelSetup:enableDisableModules";
export const projectMSUDF = "projectDirectory:3dModelSetup:udfMapping";
export const projectMSCompareModel = "projectDirectory:3dModelSetup:compareModel";
export const projectMSDownloadReport = "projectDirectory:3dModelSetup:downloadComparisonReport";
export const projectMSViewReport = "projectDirectory:3dModelSetup:comparisonReport";
export const projectModelCheck = "projectDirectory:3dModelSetup:modelCheck";
export const projectModelLock = "projectDirectory:3dModelSetup:lockTheModel";

// Project Specs
export const projectSpecsView = "projectDirectory:projectSpecs";
export const projectGeneralView = "projectDirectory:projectSpecs:generalSpecs";
export const projectSequencesView = "projectDirectory:projectSpecs:sequences";
export const projectFinishDetailsView = "projectDirectory:projectSpecs:finishDetails";
export const projectAllownaceView = "projectDirectory:projectSpecs:lengthAllowance";
export const projectConnSpecsView = "projectDirectory:projectSpecs:connectionSpecs";
export const projectMainSteelView = "projectDirectory:projectSpecs:mainSteelConnections";
export const projectMiscConnView = "projectDirectory:projectSpecs:miscSteelConnections";
export const projectSpecsNotesView = "projectDirectory:projectSpecs:notes";
export const rfiSettingsView = "projectDirectory:projectSpecs:rfisRfiResponseTime";

// --- Contacts ---
export const contactActiveDeactive = "contacts:contacts:activateDeactivateContact";
export const contactsAddCompany = "contacts:contacts:addContactCompany";
// ... and so on for all the other constants ...

// --- RFI Manager ---
export const rfiDashboard = "rfiManager:dashboard";
export const rfiDashboardView = "rfiManager:dashboard:view";
// ... etc.

// It's recommended to export all constants from the original file similarly.